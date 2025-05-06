<?php

namespace App\Action;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Response\CommonResponse;

class GetAllMatrimonyProfiles
{
    public function __invoke(): array
    {
        try {
            $profiles = DB::table('matrimonies')
                ->leftJoin('users', 'matrimonies.user_id', '=', 'users.id')
                ->leftJoin('fathers', 'matrimonies.user_id', '=', 'fathers.user_id')
                ->leftJoin('mothers', 'matrimonies.user_id', '=', 'mothers.user_id')
                ->leftJoin('horoscope_details', 'matrimonies.user_id', '=', 'horoscope_details.user_id')
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
                    'horoscope_details.birthdate as horoscope_birthdate',
                    'horoscope_details.birth_country as horoscope_birth_country',
                    'horoscope_details.horoscope_matching_required as horoscope_matching_required',
                    'horoscope_details.birth_city as horoscope_birth_city',
                    'horoscope_details.birth_time as horoscope_birth_time',
                    'pictures.image_path as profile_picture',
                    'matrimonies.created_at as matrimony_created_at'
                )
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
                    'horoscope' => [
                        'birthdate' => $profile->horoscope_birthdate ?? '',
                        'birth_country' => $profile->horoscope_birth_country ?? '',
                        'horoscope_matching_required' => $profile->horoscope_matching_required ?? false,
                        'birth_city' => $profile->horoscope_birth_city ?? '',
                        'birth_time' => $profile->horoscope_birth_time ?? '',
                    ],
                    'profile_picture' => $profilePictureData,
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
            Log::warning("Image not found: {$imagePath} or {$storagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting image data: ' . $e->getMessage());
            return null;
        }
    }
}
