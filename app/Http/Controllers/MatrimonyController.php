<?php

namespace App\Http\Controllers;

use App\Action\CreateMatrimonyProfile;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMatrimonyRequest;

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
}
