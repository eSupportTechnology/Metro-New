<?php

namespace App\Http\Controllers;

use App\Action\CreateMatrimonyProfile;
use App\Action\GetActiveMatrimonyProfiles;
use App\Action\GetAllMatrimonyProfiles;
use App\Action\GetSingleMatrimonyProfile;
use App\Action\MatrimonyDelete;
use App\Action\UpdateActiveStatus;
use App\Action\UpdateBootPost;
use App\Action\UpdatePackageNumber;
//use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\StoreMatrimonyRequest;
use Illuminate\Http\Request;

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

    public function getActiveMatrimony(GetActiveMatrimonyProfiles $getActiveMatrimonyProfiles): JsonResponse
    {
        return response()->json($getActiveMatrimonyProfiles());
    }

    public function getProfile($profileId, GetSingleMatrimonyProfile $getSingleMatrimonyProfile): JsonResponse
    {
        return response()->json($getSingleMatrimonyProfile($profileId));
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

    public function updateActiveStatus(Request $request, string $matrimonyId, UpdateActiveStatus $action): JsonResponse
    {
        $validated = $request->validate([
            'is_active' => 'required|boolean',
        ]);

        return response()->json($action($matrimonyId, $validated['is_active']));
    }
}
