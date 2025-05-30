<?php

namespace App\Action\Matrimony;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GetActiveMatrimonyProfiles
{
    public function __invoke(): array
    {
        try {
            $profiles = DB::table('matrimonies')
                ->leftJoin('users', 'matrimonies.user_id', '=', 'users.id')
                ->leftJoin('fathers', 'matrimonies.user_id', '=', 'fathers.user_id')
                ->leftJoin('mothers', 'matrimonies.user_id', '=', 'mothers.user_id')
                ->leftJoin('nic_details', 'matrimonies.user_id', '=', 'nic_details.user_id')
                ->leftJoin('pictures', 'matrimonies.user_id', '=', 'pictures.user_id')
                ->select(
                    'matrimonies.*',
                    'users.first_name', 'users.last_name', 'users.email',
                    'fathers.ethnicity as father_ethnicity', 'fathers.religion as father_religion',
                    'fathers.caste as father_caste', 'fathers.country_of_residence as father_country_of_residence',
                    'fathers.profession as father_profession', 'fathers.additional_info as father_additional_info',
                    'mothers.ethnicity as mother_ethnicity', 'mothers.religion as mother_religion',
                    'mothers.caste as mother_caste', 'mothers.country_of_residence as mother_country_of_residence',
                    'mothers.profession as mother_profession', 'mothers.additional_info as mother_additional_info',
                    'nic_details.nic_number',
                    'nic_details.nic_front_image',
                    'nic_details.nic_back_image',
                    'nic_details.is_verified',
                    'pictures.image_path as profile_picture',
                    'matrimonies.created_at as matrimony_created_at',
                    'matrimonies.boot_post',
                    'matrimonies.package_number',
                    'matrimonies.is_active'
                )
                ->where('matrimonies.is_active', 1)
                ->get();

            $groupedProfiles = $this->groupProfiles($profiles);

            return CommonResponse::sendSuccessResponseWithData('Matrimony Profiles', $groupedProfiles);
        } catch (\Exception $e) {
            Log::error('GetAllMatrimonyProfiles Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve matrimony profiles: ' . $e->getMessage());
        }
    }

    private function groupProfiles($profiles): array
    {
        $groupedProfiles = [];

        foreach ($profiles as $profile) {
            $userId = $profile->user_id;

            if (!isset($groupedProfiles[$userId])) {
                $profilePictureData = null;
                if ($profile->profile_picture) {
                    $profilePictureData = $this->getImageData($profile->profile_picture);
                }

                $nicFrontImageData = null;
                $nicBackImageData = null;
                if ($profile->nic_front_image) {
                    $nicFrontImageData = $this->getNicImageData($profile->nic_front_image);
                }
                if ($profile->nic_back_image) {
                    $nicBackImageData = $this->getNicImageData($profile->nic_back_image);
                }

                $groupedProfiles[$userId] = [
                    'user_id' => $userId,
                    'first_name' => $profile->first_name,
                    'last_name' => $profile->last_name,
                    'email' => $profile->email,
                    'matrimony' => [
                        'display_name' => $profile->display_name,
                        'account_created_by' => $profile->account_created_by,
                        'birthdate' => $profile->birthdate,
                        'gender' => $profile->gender,
                        'ethnicity' => $profile->ethnicity,
                        'religion' => $profile->religion,
                        'caste' => $profile->caste,
                        'height' => $profile->height,
                        'civil_status' => $profile->civil_status,
                        'country_of_residence' => $profile->country_of_residence,
                        'state_district' => $profile->state_district,
                        'city' => $profile->city,
                        'visa_type' => $profile->visa_type,
                        'education_level' => $profile->education_level,
                        'profession' => $profile->profession,
                        'drinking' => $profile->drinking,
                        'food_preference' => $profile->food_preference,
                        'smoking' => $profile->smoking,
                        'created_at' => $profile->matrimony_created_at,
                        'boot_post' => $profile->boot_post,
                        'package_number' => $profile->package_number ?? 1,
                        'is_active' => $profile->is_active ?? true
                    ],
                    'father' => [
                        'ethnicity' => $profile->father_ethnicity ?? '',
                        'religion' => $profile->father_religion ?? '',
                        'caste' => $profile->father_caste ?? '',
                        'country_of_residence' => $profile->father_country_of_residence ?? '',
                        'profession' => $profile->father_profession ?? '',
                        'additional_info' => $profile->father_additional_info ?? '',
                    ],
                    'mother' => [
                        'ethnicity' => $profile->mother_ethnicity ?? '',
                        'religion' => $profile->mother_religion ?? '',
                        'caste' => $profile->mother_caste ?? '',
                        'country_of_residence' => $profile->mother_country_of_residence ?? '',
                        'profession' => $profile->mother_profession ?? '',
                        'additional_info' => $profile->mother_additional_info ?? '',
                    ],
                    'nic_details' => [
                        'nic_number' => $profile->nic_number ?? '',
                        'nic_front_image' => $profile->nic_front_image ?? '',
                        'is_verified' => $profile->is_verified ?? '',
                        'nic_back_image' => $profile->nic_back_image ?? '',
                        'nic_front_image_url' => $nicFrontImageData ? $this->getImageUrl($profile->nic_front_image) : null,
                        'nic_back_image_url' => $nicBackImageData ? $this->getImageUrl($profile->nic_back_image) : null,
                        'nic_front_image_data' => $nicFrontImageData,
                        'nic_back_image_data' => $nicBackImageData,
                    ],
                    'profile_picture' => $profilePictureData,
                    'profile_picture_url' => $profile->profile_picture ? $this->getImageUrl($profile->profile_picture) : null,
                    'is_active' => $profile->is_active ?? true
                ];
            }
        }

        return array_values($groupedProfiles);
    }

    private function getImageData(string $imagePath): ?string
    {
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

            $directPath = str_replace('storage/', '', $imagePath);
            if (Storage::disk('public')->exists($directPath)) {
                $binaryData = Storage::disk('public')->get($directPath);
                $mimeType = Storage::disk('public')->mimeType($directPath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            Log::warning("Image not found: {$imagePath} or {$storagePath} or {$directPath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting image data: ' . $e->getMessage());
            return null;
        }
    }

    private function getNicImageData(string $imagePath): ?string
    {
        try {
            if (Storage::disk('public')->exists($imagePath)) {
                $binaryData = Storage::disk('public')->get($imagePath);
                $mimeType = Storage::disk('public')->mimeType($imagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            Log::warning("NIC image not found: {$imagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting NIC image data: ' . $e->getMessage());
            return null;
        }
    }

    private function getImageUrl(string $imagePath): ?string
    {
        try {
            if (str_starts_with($imagePath, 'storage/')) {
                return asset($imagePath);
            }

            if (Storage::disk('public')->exists($imagePath)) {
                return asset('storage/' . $imagePath);
            }

            Log::warning("Cannot generate URL for image: {$imagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error generating image URL: ' . $e->getMessage());
            return null;
        }
    }
}
