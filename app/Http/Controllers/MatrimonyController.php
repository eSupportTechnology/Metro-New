<?php

namespace App\Http\Controllers;

use App\Action\CreateMatrimonyProfile;
use App\Action\GetAllMatrimonyProfiles;
use App\Action\MatrimonyDelete;
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

    public function getAllMatrimony(GetAllMatrimonyProfiles $getAllMatrimonyProfiles): JsonResponse
    {
        return response()->json($getAllMatrimonyProfiles());
    }

    public function deleteMatrimonyProfile(string $userId, MatrimonyDelete $matrimonyDelete): JsonResponse
    {
        if ($userId) {
            return response()->json($matrimonyDelete($userId));
        }

        return response()->json([]);
    }
}
