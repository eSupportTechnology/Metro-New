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
        return response()->json($action($validatedData));
    }
}
