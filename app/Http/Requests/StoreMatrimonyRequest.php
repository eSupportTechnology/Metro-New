<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMatrimonyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'display_name' => 'required|string',
            'account_created_by' => 'required|string',
            'birthdate' => 'required|date',
            'gender' => 'required|string',
            'ethnicity' => 'required|string',
            'religion' => 'required|string',
            'caste' => 'nullable|string',
            'height' => 'nullable|string',
            'civil_status' => 'nullable|string',
            'country_of_residence' => 'required|string',
            'state_district' => 'required|string',
            'city' => 'nullable|string',
            'visa_type' => 'nullable|string',
            'education_level' => 'required|string',
            'profession' => 'required|string',
            'drinking' => 'nullable|string',
            'food_preference' => 'nullable|string',
            'smoking' => 'nullable|string',

            'nic_number' => 'nullable|string|max:12|unique:nic_details,nic_number',
            'nic_front_image' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',
            'nic_back_image' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',

            'father' => 'nullable',
            'mother' => 'nullable',

            'father.ethnicity' => 'nullable|string',
            'father.religion' => 'nullable|string',
            'father.caste' => 'nullable|string',
            'father.country_of_residence' => 'nullable|string',
            'father.profession' => 'nullable|string',
            'father.additional_info' => 'nullable|string',

            'mother.ethnicity' => 'nullable|string',
            'mother.religion' => 'nullable|string',
            'mother.caste' => 'nullable|string',
            'mother.country_of_residence' => 'nullable|string',
            'mother.profession' => 'nullable|string',
            'mother.additional_info' => 'nullable|string',
            'religion_visible' => 'nullable|boolean',

            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:10240',

            'package_number' => 'required|integer|in:1,2,3',
            'boot_post' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nic_number.unique' => 'This NIC number is already registered.',
            'nic_front_image.image' => 'NIC front image must be a valid image file.',
            'nic_back_image.image' => 'NIC back image must be a valid image file.',
            'nic_front_image.max' => 'NIC front image must not exceed 10MB.',
            'nic_back_image.max' => 'NIC back image must not exceed 10MB.',
            'image.max' => 'Profile image must not exceed 10MB.',
        ];
    }


    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);

        foreach (['father', 'mother'] as $field) {
            if ($this->has($field) && !isset($validated[$field])) {
                $value = $this->input($field);
                if (is_string($value)) {
                    $decoded = json_decode($value, true);
                    if (json_last_error() === JSON_ERROR_NONE) {
                        $validated[$field] = $decoded;
                    } else {
                        $validated[$field] = $value;
                    }
                } else {
                    $validated[$field] = $value;
                }
            }
        }

        return $validated;
    }
}
