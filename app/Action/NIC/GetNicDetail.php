<?php

namespace App\Action\NIC;

use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class GetNicDetail
{
    public function __invoke(string $nicNumber): array
    {
        try {
            $nicData = DB::table('users')
                ->leftJoin('nic_details', 'users.id', '=', 'nic_details.user_id')
                ->select(
                    'users.first_name',
                    'users.last_name',
                    'users.email',
                    'nic_details.nic_number',
                    'nic_details.nic_front_image',
                    'nic_details.nic_back_image',
                    'nic_details.is_verified'
                )
                ->where('nic_details.nic_number', $nicNumber)
                ->first();

            if (!$nicData) {
                return CommonResponse::sendBadRequestResponse('NIC details not found');
            }

            $formattedData = $this->formatNicData($nicData);

            return CommonResponse::sendSuccessResponseWithData('NIC Detail', $formattedData);

        } catch (\Exception $e) {
            Log::error('GetNicDetail Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to retrieve NIC detail: ' . $e->getMessage());
        }
    }

    private function formatNicData($data): array
    {
        $nicFrontImageData = null;
        $nicBackImageData = null;
        $nicFrontImageUrl = null;
        $nicBackImageUrl = null;

        if ($data->nic_front_image) {
            $nicFrontImageData = $this->getNicImageData($data->nic_front_image);
            $nicFrontImageUrl = $this->getImageUrl($data->nic_front_image);
        }
        if ($data->nic_back_image) {
            $nicBackImageData = $this->getNicImageData($data->nic_back_image);
            $nicBackImageUrl = $this->getImageUrl($data->nic_back_image);
        }

        return [
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'email' => $data->email,
            'nic_number' => $data->nic_number ?? '',
            'nic_front_image' => $data->nic_front_image ?? '',
            'nic_back_image' => $data->nic_back_image ?? '',
            'is_verified' => $data->is_verified ?? false,
            'nic_front_image_url' => $nicFrontImageUrl,
            'nic_back_image_url' => $nicBackImageUrl,
            'nic_front_image_data' => $nicFrontImageData,
            'nic_back_image_data' => $nicBackImageData,
        ];
    }

    private function getNicImageData(string $imagePath): ?string
    {
        try {
            if (Storage::disk('public')->exists($imagePath)) {
                $binaryData = Storage::disk('public')->get($imagePath);
                $mimeType = Storage::disk('public')->mimeType($imagePath);
                return 'data:' . $mimeType . ';base64,' . base64_encode($binaryData);
            }

            Log::warning("NIC image not found: {$imagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error getting NIC image data: ' . $e->getMessage());
            return null;
        }
    }

    private function getImageUrl(string $imagePath): ?string
    {
        try {
            if (str_starts_with($imagePath, 'storage/')) {
                return asset($imagePath);
            }

            if (Storage::disk('public')->exists($imagePath)) {
                return asset('storage/' . $imagePath);
            }

            Log::warning("Cannot generate URL for image: {$imagePath}");
            return null;
        } catch (\Exception $e) {
            Log::error('Error generating image URL: ' . $e->getMessage());
            return null;
        }
    }
}
