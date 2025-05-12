<?php

namespace App\Action\Matrimony;

use App\Models\Matrimony;
use App\Response\CommonResponse;

class UpdatePackageNumber
{
    public function __invoke(string $matrimonyId, int $packageNumber): array
    {
        try {
            $matrimony = Matrimony::where('user_id', $matrimonyId)->first();

            if (!$matrimony) {
                return CommonResponse::sendBadRequestResponse('Matrimony profile not found.');
            }

            $matrimony->update([
                'package_number' => $packageNumber,
            ]);

            return CommonResponse::sendSuccessResponse('Package number updated successfully.');
        } catch (\Exception $e) {
            return CommonResponse::sendBadRequestResponse('Error updating package number: ' . $e->getMessage());
        }
    }
}
