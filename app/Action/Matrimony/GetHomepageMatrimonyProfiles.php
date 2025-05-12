<?php

namespace App\Action\Matrimony;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GetHomepageMatrimonyProfiles
{
    public function __invoke(): array
    {
        try {
            $baseQuery = DB::table('matrimonies')
                ->leftJoin('users', 'matrimonies.user_id', '=', 'users.id')
                ->leftJoin('pictures', 'matrimonies.user_id', '=', 'pictures.user_id')
                ->select(
                    'matrimonies.user_id',
                    'matrimonies.display_name',
                    'matrimonies.gender',
                    'matrimonies.city',
                    'matrimonies.country_of_residence',
                    'matrimonies.package_number',
                    'matrimonies.boot_post',
                    'matrimonies.created_at',
                    'pictures.image_path as profile_picture',
                    'users.first_name',
                    'users.last_name'
                );

            $randomProfiles = (clone $baseQuery)->inRandomOrder()->limit(8)->get();
            $bootPostProfiles = (clone $baseQuery)->where('boot_post', 1)->inRandomOrder()->limit(8)->get();
            $latestProfiles = (clone $baseQuery)->orderByDesc('matrimonies.created_at')->limit(8)->get();
            $package3Profiles = (clone $baseQuery)->where('package_number', 3)->inRandomOrder()->limit(8)->get();

            return CommonResponse::sendSuccessResponseWithData('Homepage Profiles', [
                'random_profiles' => $this->formatProfiles($randomProfiles),
                'boot_post_profiles' => $this->formatProfiles($bootPostProfiles),
                'latest_profiles' => $this->formatProfiles($latestProfiles),
                'package_3_profiles' => $this->formatProfiles($package3Profiles),
            ]);
        } catch (\Exception $e) {
            Log::error('GetHomepageMatrimonyProfiles Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve homepage matrimony profiles.');
        }
    }

    private function formatProfiles($profiles): array
    {
        return $profiles->map(function ($profile) {
            return [
                'user_id' => $profile->user_id,
                'display_name' => $profile->display_name,
                'gender' => $profile->gender,
                'city' => $profile->city,
                'country' => $profile->country_of_residence,
                'package_number' => $profile->package_number,
                'boot_post' => $profile->boot_post,
                'created_at' => $profile->created_at,
                'profile_picture' => $this->getImageData($profile->profile_picture),
                'name' => trim("{$profile->first_name} {$profile->last_name}"),
            ];
        })->toArray();
    }

    private function getImageData(?string $imagePath): ?string
    {
        if (!$imagePath) {
            return null;
        }

        try {
            $storagePath = str_replace('storage/', 'public/', $imagePath);

            if (Storage::exists($storagePath)) {
                $binaryData = Storage::get($storagePath);
                $mimeType = Storage::mimeType($storagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            if (Storage::disk('public')->exists($imagePath)) {
                $binaryData = Storage::disk('public')->get($imagePath);
                $mimeType = Storage::disk('public')->mimeType($imagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            Log::warning("Image not found: {$imagePath} or {$storagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting image data: ' . $e->getMessage());
            return null;
        }
    }
}
