<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VerifyOtpRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone' => ['required', 'string', 'regex:/^[0-9+\-\s()]+$/', 'min:10', 'max:15'],
            'otp_code' => ['required', 'string', 'size:6'],
            'type' => ['required', 'string', 'in:login,register'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone.required' => 'Phone number is required.',
            'phone.regex' => 'Please enter a valid phone number.',
            'otp_code.required' => 'OTP code is required.',
            'otp_code.size' => 'OTP code must be exactly 6 digits.',
            'type.in' => 'Type must be either login or register.',
        ];
    }
}
