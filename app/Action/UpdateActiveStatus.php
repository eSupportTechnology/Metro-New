<?php

namespace App\Action;

use App\Models\Matrimony;
use App\Response\CommonResponse;

class UpdateActiveStatus
{
    public function __invoke(string $matrimonyId, bool $isActive): array
    {
        try {
            $matrimony = Matrimony::where('user_id', $matrimonyId)->first();

            if (!$matrimony) {
                return CommonResponse::sendBadRequestResponse('Matrimony profile not found.');
            }

            $matrimony->update([
                'is_active' => $isActive,
            ]);

            return CommonResponse::sendSuccessResponse('Active status updated successfully.');
        } catch (\Exception $e) {
            return CommonResponse::sendBadRequestResponse('Error updating active status: ' . $e->getMessage());
        }
    }
}
