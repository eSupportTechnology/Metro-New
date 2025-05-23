<?php

namespace App\Action\NIC;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RejectNic
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
                    'is_verified' => 2,
                    'updated_at' => now()
                ]);

            if ($updated) {
                Log::info("NIC {$nicNumber} has been rejected");
                return CommonResponse::sendSuccessResponse('NIC has been successfully rejected');
            } else {
                return CommonResponse::sendBadRequestResponse('Failed to reject NIC');
            }

        } catch (\Exception $e) {
            Log::error('RejectNic Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to reject NIC: ' . $e->getMessage());
        }
    }
}
