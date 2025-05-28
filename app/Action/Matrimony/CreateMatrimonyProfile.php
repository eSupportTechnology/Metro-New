<?php

namespace App\Action\Matrimony;

use App\Models\Father;
use App\Models\Matrimony;
use App\Models\Mother;
use App\Models\NicDetail;
use App\Models\Picture;
use App\Models\User;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class CreateMatrimonyProfile
{
    public function __invoke(array $validatedData): array
    {
        try {
            foreach (['father', 'mother'] as $field) {
                if (isset($validatedData[$field])) {
                    if (is_string($validatedData[$field])) {
                        $decoded = json_decode($validatedData[$field], true);
                        if (json_last_error() === JSON_ERROR_NONE) {
                            $validatedData[$field] = $decoded;
                        }
                    }
                } else {
                    $validatedData[$field] = [];
                }
            }

            $user = User::where('first_name', $validatedData['first_name'])
                ->where('last_name', $validatedData['last_name'])
                ->where('email', $validatedData['email'])
                ->where('role_as', 2)
                ->first();

            if (!$user) {
                $user = User::create([
                    'first_name' => $validatedData['first_name'],
                    'last_name' => $validatedData['last_name'],
                    'email' => $validatedData['email'],
                    'password' => Hash::make('12345678'),
                    'role_as' => 2,
                ]);
            }

            $existingMatrimonyProfile = Matrimony::where('user_id', $user->id)->first();
            if ($existingMatrimonyProfile) {
                return CommonResponse::sendBadRequestResponse('Matrimony profile already created');
            }

            $existingNic = NicDetail::where('nic_number', $validatedData['nic_number'])
                ->where('user_id', '!=', $user->id)
                ->first();
            if ($existingNic) {
                return CommonResponse::sendBadRequestResponse('This NIC number is already registered');
            }

            Matrimony::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'display_name' => $validatedData['display_name'],
                    'account_created_by' => $validatedData['account_created_by'],
                    'birthdate' => $validatedData['birthdate'],
                    'gender' => $validatedData['gender'],
                    'ethnicity' => $validatedData['ethnicity'],
                    'religion_visible' => $validatedData['religion_visible'] ?? 1,
                    'religion' => $validatedData['religion'],
                    'caste' => $validatedData['caste'] ?? '',
                    'height' => $validatedData['height'] ?? '',
                    'civil_status' => $validatedData['civil_status'] ?? '',
                    'country_of_residence' => $validatedData['country_of_residence'],
                    'state_district' => $validatedData['state_district'],
                    'city' => $validatedData['city'] ?? '',
                    'visa_type' => $validatedData['visa_type'] ?? '',
                    'education_level' => $validatedData['education_level'],
                    'profession' => $validatedData['profession'],
                    'drinking' => $validatedData['drinking'] ?? '',
                    'food_preference' => $validatedData['food_preference'] ?? '',
                    'smoking' => $validatedData['smoking'] ?? '',
                    'package_number' => $validatedData['package_number'] ?? 1,
                    'boot_post' => $validatedData['boot_post'] ?? 0,
                ]
            );

            $fatherData = is_array($validatedData['father']) ? $validatedData['father'] : [];
            Father::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'ethnicity' => $fatherData['ethnicity'] ?? '',
                    'religion' => $fatherData['religion'] ?? '',
                    'caste' => $fatherData['caste'] ?? '',
                    'country_of_residence' => $fatherData['country_of_residence'] ?? '',
                    'profession' => $fatherData['profession'] ?? '',
                    'additional_info' => $fatherData['additional_info'] ?? '',
                ]
            );

            $motherData = is_array($validatedData['mother']) ? $validatedData['mother'] : [];
            Mother::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'ethnicity' => $motherData['ethnicity'] ?? '',
                    'religion' => $motherData['religion'] ?? '',
                    'caste' => $motherData['caste'] ?? '',
                    'country_of_residence' => $motherData['country_of_residence'] ?? '',
                    'profession' => $motherData['profession'] ?? '',
                    'additional_info' => $motherData['additional_info'] ?? '',
                ]
            );

            $nicFrontPath = null;
            $nicBackPath = null;

            if (isset($validatedData['nic_front_image'])) {
                $nicFrontImage = $validatedData['nic_front_image'];
                $nicFrontPath = $nicFrontImage->store("matrimony/{$user->id}/nic", 'public');
            }

            if (isset($validatedData['nic_back_image'])) {
                $nicBackImage = $validatedData['nic_back_image'];
                $nicBackPath = $nicBackImage->store("matrimony/{$user->id}/nic", 'public');
            }

            NicDetail::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nic_number' => $validatedData['nic_number'],
                    'nic_front_image' => $nicFrontPath,
                    'nic_back_image' => $nicBackPath,
                ]
            );

            if (isset($validatedData['image'])) {
                $image = $validatedData['image'];
                $profileImagePath = $image->store("matrimony/{$user->id}/profile", 'public');

                $publicPath = "storage/" . $profileImagePath;

                Picture::updateOrCreate(
                    ['user_id' => $user->id],
                    ['image_path' => $publicPath]
                );
            }

            return CommonResponse::sendSuccessResponse('Matrimony profile created successfully.');

        } catch (\Exception $e) {
            Log::error('Error creating matrimony profile: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Something went wrong while creating the profile: ' . $e->getMessage());
        }
    }
}
