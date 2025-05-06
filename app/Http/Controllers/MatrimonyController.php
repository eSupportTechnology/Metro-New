<?php

namespace App\Http\Controllers;

use App\Action\CreateMatrimonyProfile;
use App\Action\GetAllMatrimonyProfiles;
use App\Action\MatrimonyDelete;
use App\Action\UpdateBootPost;
use App\Action\UpdatePackageNumber;
use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMatrimonyRequest;

class MatrimonyController extends Controller
{

    public function create(StoreMatrimonyRequest $request, CreateMatrimonyProfile $action): JsonResponse
    {
        $validatedData = $request->validated();
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

    public function updateBootPost(Request $request, string $matrimonyId, UpdateBootPost $action): JsonResponse
    {
        $validated = $request->validate([
            'boot_post' => 'required|boolean',
        ]);

        return response()->json($action($matrimonyId, $validated['boot_post']));
    }

    public function updatePackageNumber(Request $request, string $matrimonyId, UpdatePackageNumber $action): JsonResponse
    {
        $validated = $request->validate([
            'package_number' => 'required|integer|in:1,2,3',
        ]);

        return response()->json($action($matrimonyId, $validated['package_number']));
    }
}
