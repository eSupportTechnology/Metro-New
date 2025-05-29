<?php

namespace App\Action\Auth;

use App\Models\Otp;
use App\Models\User;
use App\Services\SmsService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class ForgotPasswordAction
{
    protected SmsService $smsService;

    public function __construct(SmsService $smsService)
    {
        $this->smsService = $smsService;
    }

    public function sendOtp(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);

        $user = User::where('phone', $phone)->first();

        if (!$user) {
            return [
                'status' => 'error',
                'message' => 'No account found with this phone number.',
            ];
        }

        Otp::where('phone', $phone)
            ->where('type', 'fp')
            ->delete();

        $otpCode = random_int(100000, 999999);

        try {
            Otp::create([
                'phone' => $phone,
                'otp_code' => $otpCode,
                'type' => 'fp',
                'expires_at' => Carbon::now()->addMinutes(5),
                'is_verified' => false,
            ]);

            $smsResult = $this->smsService->sendOtp($phone, $otpCode);

            if ($smsResult['success']) {
                Log::info('Forgot password OTP sent successfully', [
                    'phone' => $phone,
                    'otp_code' => $otpCode,
                ]);

                return [
                    'status' => 'success',
                    'message' => 'OTP sent successfully to your phone number.',
                ];
            } else {
                Otp::where('phone', $phone)
                    ->where('otp_code', $otpCode)
                    ->where('type', 'fp')
                    ->delete();

                Log::error('Failed to send forgot password OTP via SMS', [
                    'phone' => $phone,
                    'sms_error' => $smsResult['message'] ?? 'Unknown SMS error',
                    'sms_response' => $smsResult,
                ]);

                return [
                    'status' => 'error',
                    'message' => 'Failed to send OTP. Please try again.',
                    'details' => app()->environment('local') ? ($smsResult['error'] ?? 'SMS service error') : null,
                ];
            }
        } catch (\Exception $e) {
            Log::error('Exception in ForgotPasswordAction sendOtp', [
                'phone' => $phone,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Failed to send OTP. Please try again.',
                'details' => app()->environment('local') ? $e->getMessage() : null,
            ];
        }
    }

    public function verifyOtp(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);
        $otpCode = $validatedData['otp_code'];

        $otp = Otp::where('phone', $phone)
            ->where('otp_code', $otpCode)
            ->where('type', 'fp')
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$otp) {
            Log::warning('Invalid or expired forgot password OTP attempt', [
                'phone' => $phone,
                'attempted_otp' => $otpCode,
            ]);

            return [
                'status' => 'error',
                'message' => 'Invalid or expired OTP code.',
            ];
        }

        $otp->update(['is_verified' => true]);

        Log::info('Forgot password OTP verified successfully', [
            'phone' => $phone,
        ]);

        return [
            'status' => 'success',
            'message' => 'OTP verified successfully. You can now reset your password.',
        ];
    }
    public function resetPassword(array $validatedData): array
    {
        $phone = $this->formatPhoneNumber($validatedData['phone']);
        $otpCode = $validatedData['otp_code'];
        $newPassword = $validatedData['password'];

        $otp = Otp::where('phone', $phone)
            ->where('otp_code', $otpCode)
            ->where('type', 'fp')
            ->where('is_verified', true)
            ->where('expires_at', '>', Carbon::now()->subMinutes(10))
            ->first();

        if (!$otp) {
            Log::warning('Attempted password reset with invalid or expired OTP', [
                'phone' => $phone,
                'otp_code' => $otpCode,
            ]);

            return [
                'status' => 'error',
                'message' => 'OTP verification expired. Please start the process again.',
            ];
        }

        $user = User::where('phone', $phone)->first();

        if (!$user) {
            Log::error('User not found during password reset', [
                'phone' => $phone,
            ]);

            return [
                'status' => 'error',
                'message' => 'User not found.',
            ];
        }

        try {
            $user->update([
                'password' => Hash::make($newPassword),
            ]);

            $otp->delete();

            Log::info('Password reset successfully', [
                'user_id' => $user->id,
                'phone' => $phone,
            ]);

            return [
                'status' => 'success',
                'message' => 'Password reset successfully. You can now sign in with your new password.',
            ];
        } catch (\Exception $e) {
            Log::error('Exception during password reset', [
                'user_id' => $user->id,
                'phone' => $phone,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'status' => 'error',
                'message' => 'Failed to reset password. Please try again.',
                'details' => app()->environment('local') ? $e->getMessage() : null,
            ];
        }
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
