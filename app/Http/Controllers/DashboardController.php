<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Matrimony;
use App\Models\Blog;
use App\Models\NicDetail;
use App\Models\MatrimonyLog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class DashboardController extends Controller
{

    public function getDashboardStats(): JsonResponse
    {
        try {
            $totalUsers = User::count();
            $newUsersThisMonth = User::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count();
            $newUsersToday = User::whereDate('created_at', Carbon::today())->count();

            $totalMatrimonyProfiles = Matrimony::count();
            $activeProfiles = Matrimony::where('is_active', true)->count();
            $inactiveProfiles = Matrimony::where('is_active', false)->count();
            $newProfilesThisMonth = Matrimony::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count();

            $totalNicSubmissions = NicDetail::count();
            $verifiedNics = NicDetail::where('is_verified', true)->count();
            $pendingNicVerifications = NicDetail::where('is_verified', false)->count();

            $totalBlogs = Blog::count();
            $blogsThisMonth = Blog::whereMonth('created_at', Carbon::now()->month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count();

            $recentLogs = MatrimonyLog::with('matrimony')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            $maleProfiles = Matrimony::where('gender', 'male')->count();
            $femaleProfiles = Matrimony::where('gender', 'female')->count();

            $packageDistribution = Matrimony::selectRaw('package_number, COUNT(*) as count')
                ->groupBy('package_number')
                ->get();

            $recentUsers = User::select('id', 'first_name', 'last_name', 'email', 'created_at')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            $recentProfiles = Matrimony::select('id', 'display_name', 'gender', 'is_active', 'created_at')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => [
                    'user_statistics' => [
                        'total_users' => $totalUsers,
                        'new_users_this_month' => $newUsersThisMonth,
                        'new_users_today' => $newUsersToday,
                    ],
                    'matrimony_statistics' => [
                        'total_profiles' => $totalMatrimonyProfiles,
                        'active_profiles' => $activeProfiles,
                        'inactive_profiles' => $inactiveProfiles,
                        'new_profiles_this_month' => $newProfilesThisMonth,
                        'gender_distribution' => [
                            'male' => $maleProfiles,
                            'female' => $femaleProfiles,
                        ],
                    ],
                    'nic_verification_statistics' => [
                        'total_submissions' => $totalNicSubmissions,
                        'verified' => $verifiedNics,
                        'pending' => $pendingNicVerifications,
                        'verification_rate' => $totalNicSubmissions > 0 ? round(($verifiedNics / $totalNicSubmissions) * 100, 2) : 0,
                    ],
                    'blog_statistics' => [
                        'total_blogs' => $totalBlogs,
                        'blogs_this_month' => $blogsThisMonth,
                    ],
                    'package_distribution' => $packageDistribution,
                    'recent_activity' => [
                        'recent_users' => $recentUsers,
                        'recent_profiles' => $recentProfiles,
                        'recent_logs' => $recentLogs,
                    ],
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch dashboard statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function getMonthlyStats(): JsonResponse
    {
        try {
            $currentYear = Carbon::now()->year;

            $monthlyUsers = User::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->whereYear('created_at', $currentYear)
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->pluck('count', 'month');

            $monthlyProfiles = Matrimony::selectRaw('MONTH(created_at) as month, COUNT(*) as count')
                ->whereYear('created_at', $currentYear)
                ->groupBy('month')
                ->orderBy('month')
                ->get()
                ->pluck('count', 'month');

            $months = collect(range(1, 12))->mapWithKeys(function ($month) use ($monthlyUsers, $monthlyProfiles) {
                return [
                    $month => [
                        'month' => Carbon::create()->month($month)->format('M'),
                        'users' => $monthlyUsers->get($month, 0),
                        'profiles' => $monthlyProfiles->get($month, 0),
                    ]
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => [
                    'year' => $currentYear,
                    'monthly_data' => $months->values(),
                ],
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch monthly statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
