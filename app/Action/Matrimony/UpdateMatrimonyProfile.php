<?php

namespace App\Action\Matrimony;

use App\Models\Father;
use App\Models\Matrimony;
use App\Models\Mother;
use App\Models\NicDetail;
use App\Models\Picture;
use App\Models\User;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UpdateMatrimonyProfile
{
    public function __invoke(int $matrimonyId, array $validatedData): array
    {
        try {
            $matrimony = Matrimony::find($matrimonyId);
            if (!$matrimony) {
                return CommonResponse::sendBadRequestResponse('Matrimony profile not found.');
            }

            $user = User::find($matrimony->user_id);
            if (!$user) {
                return CommonResponse::sendBadRequestResponse('Associated user not found.');
            }

            foreach (['father', 'mother'] as $field) {
                if (isset($validatedData[$field]) && is_string($validatedData[$field])) {
                    $decoded = json_decode($validatedData[$field], true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $validatedData[$field] = $decoded;
                    }
                } elseif (!isset($validatedData[$field])) {
                    $validatedData[$field] = [];
                }
            }

            $user->update([
                'first_name' => $validatedData['first_name'] ?? $user->first_name,
                'last_name' => $validatedData['last_name'] ?? $user->last_name,
                'email' => $validatedData['email'] ?? $user->email,
            ]);

            if (!empty($validatedData['nic_number'])) {
                $existingNic = NicDetail::where('nic_number', $validatedData['nic_number'])
                    ->where('user_id', '!=', $user->id)
                    ->first();
                if ($existingNic) {
                    return CommonResponse::sendBadRequestResponse('This NIC number is already registered');
                }
            }

            $matrimony->update([
                'display_name' => $validatedData['display_name'] ?? $matrimony->display_name,
                'account_created_by' => $validatedData['account_created_by'] ?? $matrimony->account_created_by,
                'birthdate' => $validatedData['birthdate'] ?? $matrimony->birthdate,
                'gender' => $validatedData['gender'] ?? $matrimony->gender,
                'ethnicity' => $validatedData['ethnicity'] ?? $matrimony->ethnicity,
                'religion_visible' => $validatedData['religion_visible'] ?? $matrimony->religion_visible,
                'religion' => $validatedData['religion'] ?? $matrimony->religion,
                'caste' => $validatedData['caste'] ?? $matrimony->caste,
                'height' => $validatedData['height'] ?? $matrimony->height,
                'civil_status' => $validatedData['civil_status'] ?? $matrimony->civil_status,
                'country_of_residence' => $validatedData['country_of_residence'] ?? $matrimony->country_of_residence,
                'state_district' => $validatedData['state_district'] ?? $matrimony->state_district,
                'city' => $validatedData['city'] ?? $matrimony->city,
                'visa_type' => $validatedData['visa_type'] ?? $matrimony->visa_type,
                'education_level' => $validatedData['education_level'] ?? $matrimony->education_level,
                'profession' => $validatedData['profession'] ?? $matrimony->profession,
                'drinking' => $validatedData['drinking'] ?? $matrimony->drinking,
                'food_preference' => $validatedData['food_preference'] ?? $matrimony->food_preference,
                'smoking' => $validatedData['smoking'] ?? $matrimony->smoking,
                'package_number' => $validatedData['package_number'] ?? $matrimony->package_number,
                'boot_post' => $validatedData['boot_post'] ?? $matrimony->boot_post,
            ]);

            $fatherData = $validatedData['father'] ?? [];
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

            $motherData = $validatedData['mother'] ?? [];
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

            if (isset($validatedData['nic_front_image'])) {
                if ($matrimony->nicDetail && $matrimony->nicDetail->nic_front_image) {
                    Storage::disk('public')->delete($matrimony->nicDetail->nic_front_image);
                }
                $nicFrontPath = $validatedData['nic_front_image']->store("matrimony/{$user->id}/nic", 'public');
            } else {
                $nicFrontPath = $matrimony->nicDetail->nic_front_image ?? null;
            }

            if (isset($validatedData['nic_back_image'])) {
                if ($matrimony->nicDetail && $matrimony->nicDetail->nic_back_image) {
                    Storage::disk('public')->delete($matrimony->nicDetail->nic_back_image);
                }
                $nicBackPath = $validatedData['nic_back_image']->store("matrimony/{$user->id}/nic", 'public');
            } else {
                $nicBackPath = $matrimony->nicDetail->nic_back_image ?? null;
            }

            NicDetail::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nic_number' => $validatedData['nic_number'] ?? ($matrimony->nicDetail->nic_number ?? null),
                    'nic_front_image' => $nicFrontPath,
                    'nic_back_image' => $nicBackPath,
                ]
            );

            if (isset($validatedData['image'])) {
                if ($matrimony->picture && $matrimony->picture->image_path) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $matrimony->picture->image_path));
                }
                $profileImagePath = $validatedData['image']->store("matrimony/{$user->id}/profile", 'public');
                $publicPath = "storage/" . $profileImagePath;

                Picture::updateOrCreate(
                    ['user_id' => $user->id],
                    ['image_path' => $publicPath]
                );
            }

            return CommonResponse::sendSuccessResponse('Matrimony profile updated successfully.');

        } catch (\Exception $e) {
            Log::error('Error updating matrimony profile: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Something went wrong while updating the profile: ' . $e->getMessage());
        }
    }
}
