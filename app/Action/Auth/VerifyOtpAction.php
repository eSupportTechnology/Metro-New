<?php

namespace App\Action\Auth;

use App\Models\Otp;
use App\Models\User;
use App\Services\Response\AuthenticationResponse;
use Carbon\Carbon;

class VerifyOtpAction
{
    public function __invoke(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);
        $otpCode = $validatedData['otp_code'];
        $type = $validatedData['type'];

        $otp = Otp::where('phone', $phone)
            ->where('otp_code', $otpCode)
            ->where('type', $type)
            ->where('is_verified', false)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$otp) {
            return [
                'status' => 'error',
                'message' => 'Invalid or expired OTP code.',
            ];
        }

        $otp->update(['is_verified' => true]);

        if ($type === 'login') {
            $user = User::where('phone', $phone)->first();

            if (!$user) {
                return [
                    'status' => 'error',
                    'message' => 'User not found.',
                ];
            }

            return AuthenticationResponse::sendUserSendAuthenticatedResponse($user);
        }

        return [
            'status' => 'success',
            'message' => 'Phone number verified successfully. Please complete your registration.',
        ];
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
