<?php

namespace App\Action\Auth;

use App\Models\Otp;
use App\Models\User;
use App\Services\Response\AuthenticationResponse;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PhoneRegisterAction
{
    public function __invoke(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);
        $otpCode = $validatedData['otp_code'];

        $otp = Otp::where('phone', $phone)
            ->where('otp_code', $otpCode)
            ->where('type', 'register')
            ->where('is_verified', true)
            ->where('expires_at', '>', Carbon::now()->subMinutes(10))
            ->first();

        if (!$otp) {
            return [
                'status' => 'error',
                'message' => 'OTP verification expired. Please request a new OTP.',
            ];
        }

        if (User::where('phone', $phone)->exists()) {
            return [
                'status' => 'error',
                'message' => 'An account with this phone number already exists.',
            ];
        }

        if (User::where('email', $validatedData['email'])->exists()) {
            return [
                'status' => 'error',
                'message' => 'An account with this email already exists.',
            ];
        }

        $user = User::create([
            'id' => Str::uuid(),
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'phone' => $phone,
            'password' => Hash::make($validatedData['password']),
            'religion' => $validatedData['religion'],
            'role_as' => 2,
        ]);

        $otp->delete();

        return AuthenticationResponse::sendUserSendAuthenticatedResponse($user);
    }

    private function formatPhoneNumber(string $phone): string
    {
        $phone = preg_replace('/[^0-9]/', '', $phone);

        if (strlen($phone) === 12 && substr($phone, 0, 3) === '947') {
            return '0' . substr($phone, 3);
        }

        if (strlen($phone) === 9) {
            return '0' . $phone;
        }

        return $phone;
    }
}
