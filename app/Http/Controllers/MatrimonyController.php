<?php

namespace App\Http\Controllers;

use App\Action\Matrimony\CreateMatrimonyProfile;
use App\Action\Matrimony\GetActiveMatrimonyProfiles;
use App\Action\Matrimony\GetAllMatrimonyProfiles;
use App\Action\Matrimony\GetHomepageMatrimonyProfiles;
use App\Action\Matrimony\GetSingleMatrimonyProfile;
use App\Action\Matrimony\MatrimonyDelete;
use App\Action\Matrimony\UpdateActiveStatus;
use App\Action\Matrimony\UpdateBootPost;
use App\Action\Matrimony\UpdatePackageNumber;
use App\Http\Requests\StoreMatrimonyRequest;
use Illuminate\Http\JsonResponse;
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

    public function getHomepageProfiles(GetHomepageMatrimonyProfiles $getHomepageMatrimonyProfiles): JsonResponse
    {
        return response()->json($getHomepageMatrimonyProfiles());
    }

}
