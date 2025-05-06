<?php

namespace App\Http\Controllers;

use App\Action\CheckUserAuthentication;
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
}
