<?php

namespace App\Action\Matrimony;

use App\Models\Father;
use App\Models\HoroscopeDetail;
use App\Models\Matrimony;
use App\Models\Mother;
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
            foreach (['father', 'mother', 'horoscope'] as $field) {
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

            Matrimony::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'display_name' => $validatedData['display_name'],
                    'account_created_by' => $validatedData['account_created_by'],
                    'birthdate' => $validatedData['birthdate'],
                    'gender' => $validatedData['gender'],
                    'ethnicity' => $validatedData['ethnicity'],
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
            $motherData = is_array($validatedData['mother']) ? $validatedData['mother'] : [];
            $horoscopeData = is_array($validatedData['horoscope']) ? $validatedData['horoscope'] : [];

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

            $horoscopeBirthdate = isset($horoscopeData['birthdate']) && $horoscopeData['birthdate']
                ? $horoscopeData['birthdate']
                : $validatedData['birthdate'];

            HoroscopeDetail::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'birthdate' => $horoscopeBirthdate,
                    'birth_country' => $horoscopeData['birth_country'] ?? '',
                    'horoscope_matching_required' => $horoscopeData['horoscope_matching_required'] ?? false,
                    'birth_city' => $horoscopeData['birth_city'] ?? '',
                    'birth_time' => $horoscopeData['birth_time'] ?? '',
                ]
            );

            if (isset($validatedData['image'])) {
                $image = $validatedData['image'];
                $path = $image->storeAs("public/matrimony/{$user->id}", $image->getClientOriginalName());
                $publicPath = str_replace('public/', 'storage/', $path);

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
