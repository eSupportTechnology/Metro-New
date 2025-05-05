<?php

namespace App\Http\Controllers;

use App\Action\CreateMatrimonyProfile;
use App\Models\Father;
use App\Models\HoroscopeDetail;
use App\Models\Matrimony;
use App\Models\Mother;
use App\Models\Picture;
use App\Services\Response\CommonResponse;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMatrimonyRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MatrimonyController extends Controller
{
    public function create(StoreMatrimonyRequest $request, CreateMatrimonyProfile $action): JsonResponse
    {
        $validatedData = $request->validated();
        if (!isset($validatedData['father'])) {
            $validatedData['father'] = [];
        } elseif (is_string($validatedData['father'])) {
            $validatedData['father'] = json_decode($validatedData['father'], true);
        }

        if (!isset($validatedData['mother'])) {
            $validatedData['mother'] = [];
        } elseif (is_string($validatedData['mother'])) {
            $validatedData['mother'] = json_decode($validatedData['mother'], true);
        }

        if (!isset($validatedData['horoscope'])) {
            $validatedData['horoscope'] = [];
        } elseif (is_string($validatedData['horoscope'])) {
            $validatedData['horoscope'] = json_decode($validatedData['horoscope'], true);
        }

        return response()->json($action($validatedData));
    }

    public function getAll(): JsonResponse
    {
        try {
            $profiles = Matrimony::with(['user', 'father', 'mother', 'horoscopeDetail', 'picture'])->get();

            return response()->json(CommonResponse::sendSuccessResponseWithData('Matrimony profiles retrieved successfully', $profiles));
        } catch (Exception $e) {
            Log::error('GetAllMatrimonyProfiles Error: ' . $e->getMessage());
            return response()->json(CommonResponse::sendBadRequestResponse('Something went wrong while retrieving profiles.'));
        }
    }

    public function delete($id): JsonResponse
    {
        try {
            $matrimony = Matrimony::findOrFail($id);
            $userId = $matrimony->user_id;

            DB::beginTransaction();

            try {
                Father::where('user_id', $userId)->delete();
                Mother::where('user_id', $userId)->delete();
                HoroscopeDetail::where('user_id', $userId)->delete();

                $picture = Picture::where('user_id', $userId)->first();
                if ($picture) {
                    $imagePath = str_replace('storage/', 'public/', $picture->image_path);
                    if (Storage::exists($imagePath)) {
                        Storage::delete($imagePath);
                    }
                    $picture->delete();
                }

                $matrimony->delete();

                DB::commit();

                return response()->json(CommonResponse::sendSuccessResponse('Matrimony profile deleted successfully.'));
            } catch (Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (ModelNotFoundException $e) {
            return response()->json(CommonResponse::sendBadResponse());
        } catch (Exception $e) {
            Log::error('DeleteMatrimonyProfile Error: ' . $e->getMessage());
            return response()->json(CommonResponse::sendBadRequestResponse('Something went wrong while deleting the profile.'));
        }
    }
}
