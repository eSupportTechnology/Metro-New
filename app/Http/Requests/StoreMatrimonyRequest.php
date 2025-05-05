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
            'email' => 'required|email|unique:users,email',
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

            'horoscope.birthdate' => 'nullable|date',
            'horoscope.birth_country' => 'nullable|string',
            'horoscope.horoscope_matching_required' => 'nullable|boolean',
            'horoscope.birth_city' => 'nullable|string',
            'horoscope.birth_time' => 'nullable|string',

            'image' => 'nullable|image|max:2048',
        ];
    }
}
