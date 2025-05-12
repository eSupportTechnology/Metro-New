<?php

namespace App\Action\Matrimony;

use App\Models\Father;
use App\Models\HoroscopeDetail;
use App\Models\Matrimony;
use App\Models\Mother;
use App\Models\Picture;
use App\Models\User;
use App\Response\CommonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MatrimonyDelete
{
    public function __invoke(string $userId): array
    {
        DB::beginTransaction();
        try {
            $matrimony = Matrimony::where('user_id', $userId)->first();
            $user = User::find($userId);

            if (!$matrimony) {
                DB::rollBack();
                return CommonResponse::sendBadRequestResponse('Matrimony profile not found.');
            }

            Father::where('user_id', $userId)->delete();

            Mother::where('user_id', $userId)->delete();

            HoroscopeDetail::where('user_id', $userId)->delete();

            $this->deleteProfilePictures($userId);

            $matrimony->delete();
            DB::commit();
            return CommonResponse::sendSuccessResponse('Matrimony profile and related data deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('MatrimonyDelete Error: ' . $e->getMessage());
            return CommonResponse::sendBadRequestResponse('Failed to delete matrimony profile: ' . $e->getMessage());
        }
    }

    private function deleteProfilePictures(string $userId): void
    {
        $pictures = Picture::where('user_id', $userId)->get();

        foreach ($pictures as $picture) {
            $imagePath = $picture->image_path;

            if (strpos($imagePath, 'storage/') === 0) {
                $imagePath = str_replace('storage/', '', $imagePath);
            }

            if (Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }

            $picture->delete();
        }
    }
}
