<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\MatrimonyLog;

class MatrimonyService
{
    protected $weeklyBootPostLimits = [
        1 => 1,
        2 => 2,
        3 => 3,
    ];

    public function canSetBootPost(int $matrimonyId, int $packageNumber): bool
    {
        $limit = $this->weeklyBootPostLimits[$packageNumber] ?? 0;

        if ($limit <= 0) {
            return false;
        }

        $weekStart = Carbon::now()->startOfWeek();

        $count = DB::table('matrimony_logs')
            ->where('matrimony_id', $matrimonyId)
            ->where('description', 'like', '%boot_post set to 1%')
            ->where('created_at', '>=', $weekStart)
            ->count();

        return $count < $limit;
    }

    public function setBootPost(int $matrimonyId, int $packageNumber): bool
    {
        if (!$this->canSetBootPost($matrimonyId, $packageNumber)) {
            return false;
        }

        DB::table('matrimonies')
            ->where('id', $matrimonyId)
            ->update(['boot_post' => 1]);

        $description = "boot_post set to 1 for matrimony ID {$matrimonyId} under package {$packageNumber}.";

        MatrimonyLog::create([
            'matrimony_id' => $matrimonyId,
            'description' => $description,
        ]);

        return true;
    }

    public function randomlySetBootPosts(int $packageNumber, float $probability = 0.3): void
    {
        $profiles = DB::table('matrimonies')
            ->where('package_number', $packageNumber)
            ->where('is_active', 1)
            ->get();

        foreach ($profiles as $profile) {
            if (mt_rand() / mt_getrandmax() <= $probability) {
                $this->setBootPost($profile->id, $packageNumber);
            }
        }
    }
}
