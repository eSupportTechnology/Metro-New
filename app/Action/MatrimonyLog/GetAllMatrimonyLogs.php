<?php

namespace App\Action\MatrimonyLog;

use App\Models\MatrimonyLog;
use Illuminate\Support\Facades\Log;
use App\Response\CommonResponse;

class GetAllMatrimonyLogs
{
    public function __invoke(): array
    {
        try {
            $logs = MatrimonyLog::with('matrimony:id,display_name,user_id')
                ->orderBy('created_at', 'desc')
                ->get();
            $result = $logs->map(function ($log) {
                return [
                    'id' => $log->id,
                    'matrimony_id' => $log->matrimony_id,
                    'matrimony_display_name' => optional($log->matrimony)->display_name,
                    'description' => $log->description,
                    'created_at' => $log->created_at->toDateTimeString(),
                ];
            })->toArray();

            return CommonResponse::sendSuccessResponseWithData('Matrimony Logs', $result);

        } catch (\Exception $e) {
            Log::error('GetAllMatrimonyLogs Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve matrimony logs: ' . $e->getMessage());
        }
    }
}
