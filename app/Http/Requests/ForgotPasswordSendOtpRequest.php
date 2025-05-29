<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordSendOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => ['required', 'string', 'max:15'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a valid string.',
            'phone.max' => 'Phone number cannot exceed 15 characters.',
        ];
    }
}
