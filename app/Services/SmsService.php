<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsService
{
    private string $baseUrl;
    private string $userId;
    private string $apiKey;
    private string $senderId;

    public function __construct()
    {
        $this->baseUrl = 'https://app.notify.lk/api/v1';
        $this->userId = config('services.notify_lk.user_id');
        $this->apiKey = config('services.notify_lk.api_key');
        $this->senderId = config('services.notify_lk.sender_id', 'NotifyDEMO');
    }

    public function sendOtp(string $phoneNumber, string $otpCode): array
    {
        if ($this->senderId === 'NotifyDEMO') {
            $message = "Your code is: {$otpCode}. Valid for 5 minutes.";
        } else {
            $message = "Your verification code is: {$otpCode}. This code will expire in 5 minutes. Please do not share this code with anyone.";
        }

        return $this->sendSms($phoneNumber, $message);
    }

    public function sendSms(string $phoneNumber, string $message): array
    {
        try {
            $httpClient = Http::timeout(30);

            if (app()->environment('local')) {
                $httpClient = $httpClient->withOptions([
                    'verify' => false,
                ]);
            }

            $formattedPhone = $this->formatPhoneNumber($phoneNumber);

            if (!$this->isValidSriLankanNumber($formattedPhone)) {
                Log::error('Invalid Sri Lankan phone number format', [
                    'original' => $phoneNumber,
                    'formatted' => $formattedPhone
                ]);

                return [
                    'success' => false,
                    'message' => 'Invalid phone number format',
                    'error' => 'Please use a valid Sri Lankan phone number (e.g., +94701234567 or 0701234567)'
                ];
            }

            $response = $httpClient->get($this->baseUrl . '/send', [
                'user_id' => $this->userId,
                'api_key' => $this->apiKey,
                'sender_id' => $this->senderId,
                'to' => $formattedPhone,
                'message' => $message,
            ]);

            $responseData = $response->json();

            if ($response->successful() && isset($responseData['status']) && $responseData['status'] === 'success') {
                return [
                    'success' => true,
                    'message' => 'SMS sent successfully',
                    'data' => $responseData
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to send SMS',
                'error' => $responseData['message'] ?? $responseData['error'] ?? 'Unknown API error',
                'api_response' => $responseData
            ];

        } catch (\Exception $e) {
            Log::error('SMS Service Exception: ' . $e->getMessage(), [
                'phone' => $phoneNumber,
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'SMS service unavailable',
                'error' => $e->getMessage()
            ];
        }
    }

    public function getAccountStatus(): array
    {
        try {
            $httpClient = Http::timeout(30);

            if (app()->environment('local')) {
                $httpClient = $httpClient->withOptions([
                    'verify' => false,
                ]);
            }

            $response = $httpClient->get($this->baseUrl . '/status', [
                'user_id' => $this->userId,
                'api_key' => $this->apiKey,
            ]);

            return $response->json();
        } catch (\Exception $e) {
            Log::error('SMS Service Status Error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Failed to get account status',
                'error' => $e->getMessage()
            ];
        }
    }

    private function formatPhoneNumber(string $phoneNumber): string
    {
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        Log::info('Phone number formatting', [
            'original' => $phoneNumber,
            'cleaned' => $cleaned,
            'length' => strlen($cleaned)
        ]);

        if (strlen($cleaned) === 10 && substr($cleaned, 0, 1) === '0') {
            $formatted = '94' . substr($cleaned, 1);
            Log::info('Formatted phone (10 digits starting with 0)', ['result' => $formatted]);
            return $formatted;
        }

        if (strlen($cleaned) === 9) {
            $formatted = '94' . $cleaned;
            Log::info('Formatted phone (9 digits)', ['result' => $formatted]);
            return $formatted;
        }

        if (strlen($cleaned) === 11 && substr($cleaned, 0, 2) === '94') {
            Log::info('Phone already in correct format', ['result' => $cleaned]);
            return $cleaned;
        }

        if (strlen($cleaned) === 12 && substr($cleaned, 0, 3) === '947') {
            $formatted = '94' . substr($cleaned, 3);
            Log::info('Fixed 12-digit 947 format to 11-digit 94 format', ['result' => $formatted]);
            return $formatted;
        }

        if (strlen($cleaned) === 12 && substr($cleaned, 0, 3) === '940') {
            $formatted = '94' . substr($cleaned, 3);
            Log::info('Fixed 12-digit 940 format to 11-digit 94 format', ['result' => $formatted]);
            return $formatted;
        }

        Log::warning('Phone number format not recognized', [
            'cleaned' => $cleaned,
            'length' => strlen($cleaned),
            'first_3_digits' => substr($cleaned, 0, 3)
        ]);

        return $cleaned;
    }

    private function isValidSriLankanNumber(string $phoneNumber): bool
    {
        $cleaned = preg_replace('/[^0-9]/', '', $phoneNumber);

        $validPatterns = [
            '/^94(70|71|72|74|75|76|77|78)[0-9]{7}$/',
            '/^0(70|71|72|74|75|76|77|78)[0-9]{7}$/',
        ];

        foreach ($validPatterns as $pattern) {
            if (preg_match($pattern, $cleaned)) {
                return true;
            }
        }

        return false;
    }
}
