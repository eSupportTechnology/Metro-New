<?php

namespace App\Http\Controllers;

use App\Action\Auth\CheckUserAuthentication;
use App\Action\Auth\GetUserDetails;
use App\Http\Requests\GetUserDetailsRequest;
use App\Http\Requests\UserSignInValidationRequest;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function userSignIn(
        UserSignInValidationRequest $request,
        CheckUserAuthentication $checkUserAuthentication
    ): JsonResponse {
        $validatedUserSignInRequest = $request->validated();

        if ($validatedUserSignInRequest) {
            return response()->json($checkUserAuthentication($validatedUserSignInRequest));
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
    public function userLogout(CheckUserAuthentication $checkUserAuthentication): JsonResponse
    {
        $response = $checkUserAuthentication->logout();

        return response()->json($response);
    }

    public function getUserDetails(
        GetUserDetailsRequest $request,
        GetUserDetails $getUserDetails
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $getUserDetails($validatedData['id']);

        return response()->json($response, $response['status'] === 'success' ? 200 : 404);
    }
}
