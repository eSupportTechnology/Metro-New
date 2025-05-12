<?php

namespace App\Action\Matrimony;

use App\Models\Matrimony;
use App\Response\CommonResponse;

class UpdateBootPost
{
    public function __invoke(string $matrimonyId, bool $bootPost): array
    {
        try {
            $matrimony = Matrimony::where('user_id', $matrimonyId)->first();

            if (!$matrimony) {
                return CommonResponse::sendBadRequestResponse('Matrimony profile not found.');
            }

            $matrimony->update([
                'boot_post' => $bootPost,
            ]);

            return CommonResponse::sendSuccessResponse('Boot post status updated successfully.');
        } catch (\Exception $e) {
            return CommonResponse::sendBadRequestResponse('Error updating boot post: ' . $e->getMessage());
        }
    }
}
