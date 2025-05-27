<?php

namespace App\Action\Auth;

use App\Models\Otp;
use App\Models\User;
use App\Services\SmsService;
use Carbon\Carbon;

class SendOtpAction
{
    public function __construct(
        private SmsService $smsService
    ) {}

    public function __invoke(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);
        $type = $validatedData['type'];

        $userExists = User::where('phone', $phone)->exists();

        if ($type === 'login' && !$userExists) {
            return [
                'status' => 'error',
                'message' => 'No account found with this phone number.',
            ];
        }

        if ($type === 'register' && $userExists) {
            return [
                'status' => 'error',
                'message' => 'An account with this phone number already exists.',
            ];
        }

        $otpCode = $this->generateOtp();

        Otp::where('phone', $phone)->delete();

        Otp::create([
            'phone' => $phone,
            'otp_code' => $otpCode,
            'expires_at' => Carbon::now()->addMinutes(5),
            'type' => $type,
        ]);

        $smsResult = $this->smsService->sendOtp($phone, $otpCode);

        if (!$smsResult['success']) {
            return [
                'status' => 'error',
                'message' => 'Failed to send OTP. Please try again.',
                'error' => $smsResult['message']
            ];
        }

        return [
            'status' => 'success',
            'message' => 'OTP sent successfully to your phone number.',
            'expires_in' => 5
        ];
    }

    private function generateOtp(): string
    {
        return str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
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
