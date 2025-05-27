<?php

namespace App\Http\Controllers;

use App\Services\SmsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestSmsController extends Controller
{
    public function checkStatus(SmsService $smsService): JsonResponse
    {
        $status = $smsService->getAccountStatus();
        return response()->json($status);
    }

    public function testSms(Request $request, SmsService $smsService): JsonResponse
    {
        $phone = $request->input('phone', '0701376587');
        $message = $request->input('message', 'Test message from Laravel app');

        $result = $smsService->sendSms($phone, $message);

        return response()->json($result);
    }
}
