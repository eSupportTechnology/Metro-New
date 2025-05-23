<?php

namespace App\Action\NIC;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VerifyNic
{
    public function __invoke(string $nicNumber): array
    {
        try {
            $nicExists = DB::table('nic_details')
                ->where('nic_number', $nicNumber)
                ->exists();

            if (!$nicExists) {
                return CommonResponse::sendBadRequestResponse('NIC number not found');
            }

            $updated = DB::table('nic_details')
                ->where('nic_number', $nicNumber)
                ->update([
                    'is_verified' => 1,
                    'updated_at' => now()
                ]);

            if ($updated) {
                Log::info("NIC {$nicNumber} has been verified");
                return CommonResponse::sendSuccessResponse('NIC has been successfully verified');
            } else {
                return CommonResponse::sendBadRequestResponse('Failed to verify NIC');
            }

        } catch (\Exception $e) {
            Log::error('VerifyNic Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to verify NIC: ' . $e->getMessage());
        }
    }
}
