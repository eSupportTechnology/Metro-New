<?php

namespace App\Action;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Matrimony;
use App\Models\Father;
use App\Models\Mother;
use App\Models\HoroscopeDetail;
use App\Models\Picture;
use App\Response\CommonResponse;

class CreateMatrimonyProfile
{
    public function __invoke(array $validatedData): array
    {
        try {
            $user = User::where('first_name', $validatedData['first_name'])
                ->where('last_name', $validatedData['last_name'])
                ->where('role_as', 2)
                ->first();

            if (!$user) {
                $user = User::create([
                    'first_name' => $validatedData['first_name'],
                    'last_name' => $validatedData['last_name'],
                    'email' => $validatedData['email'],
                    'password' => Hash::make('12345678'),
                    'role_as' => 2
                ]);
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
                    'caste' => $validatedData['caste'],
                    'height' => $validatedData['height'],
                    'civil_status' => $validatedData['civil_status'],
                    'country_of_residence' => $validatedData['country_of_residence'],
                    'state_district' => $validatedData['state_district'],
                    'city' => $validatedData['city'],
                    'visa_type' => $validatedData['visa_type'],
                    'education_level' => $validatedData['education_level'],
                    'profession' => $validatedData['profession'],
                    'drinking' => $validatedData['drinking'],
                    'food_preference' => $validatedData['food_preference'],
                    'smoking' => $validatedData['smoking'],
                ]
            );

            Father::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'ethnicity' => $validatedData['father']['ethnicity'],
                    'religion' => $validatedData['father']['religion'],
                    'caste' => $validatedData['father']['caste'],
                    'country_of_residence' => $validatedData['father']['country_of_residence'],
                    'profession' => $validatedData['father']['profession'],
                    'additional_info' => $validatedData['father']['additional_info'],
                ]
            );

            Mother::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'ethnicity' => $validatedData['mother']['ethnicity'],
                    'religion' => $validatedData['mother']['religion'],
                    'caste' => $validatedData['mother']['caste'],
                    'country_of_residence' => $validatedData['mother']['country_of_residence'],
                    'profession' => $validatedData['mother']['profession'],
                    'additional_info' => $validatedData['mother']['additional_info'],
                ]
            );

            HoroscopeDetail::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'birthdate' => $validatedData['horoscope']['birthdate'],
                    'birth_country' => $validatedData['horoscope']['birth_country'],
                    'horoscope_matching_required' => $validatedData['horoscope']['horoscope_matching_required'],
                    'birth_city' => $validatedData['horoscope']['birth_city'],
                    'birth_time' => $validatedData['horoscope']['birth_time'],
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
            Log::error('CreateMatrimonyProfile Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Something went wrong while creating the profile.');
        }
    }
}
