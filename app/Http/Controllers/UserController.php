<?php

namespace App\Http\Controllers;

use App\Action\Auth\CheckUserAuthentication;
use App\Action\Auth\ForgotPasswordAction;
use App\Action\Auth\GetUserDetails;
use App\Action\Auth\SendOtpAction;
use App\Action\Auth\VerifyOtpAction;
use App\Action\Auth\PhoneRegisterAction;
use App\Http\Requests\ForgotPasswordResetRequest;
use App\Http\Requests\ForgotPasswordSendOtpRequest;
use App\Http\Requests\ForgotPasswordVerifyOtpRequest;
use App\Http\Requests\GetUserDetailsRequest;
use App\Http\Requests\UserSignInValidationRequest;
use App\Http\Requests\SendOtpRequest;
use App\Http\Requests\VerifyOtpRequest;
use App\Http\Requests\PhoneRegisterRequest;
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

    public function sendOtp(
        SendOtpRequest $request,
        SendOtpAction $sendOtpAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $sendOtpAction($validatedData);

        if (!isset($response['status'])) {
            $response['status'] = 'error';
        }

        return response()->json($response, $response['status'] === 'success' ? 200 : 400);
    }

    public function verifyOtp(
        VerifyOtpRequest $request,
        VerifyOtpAction $verifyOtpAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $verifyOtpAction($validatedData);

        if (!isset($response['status'])) {
            if (isset($response['access_token']) || isset($response['token'])) {
                $response['status'] = 'success';
            } else {
                $response['status'] = 'error';
                $response['message'] = $response['message'] ?? 'Verification failed';
            }
        }

        return response()->json($response, $response['status'] === 'success' ? 200 : 400);
    }

    public function phoneRegister(
        PhoneRegisterRequest $request,
        PhoneRegisterAction $phoneRegisterAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $phoneRegisterAction($validatedData);

        if (!isset($response['status'])) {
            if (isset($response['access_token']) || isset($response['token'])) {
                $response['status'] = 'success';
            } else {
                $response['status'] = 'error';
                $response['message'] = $response['message'] ?? 'Registration failed';
            }
        }

        return response()->json($response, $response['status'] === 'success' ? 201 : 400);
    }
    public function sendForgotPasswordOtp(
        ForgotPasswordSendOtpRequest $request,
        ForgotPasswordAction $forgotPasswordAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $forgotPasswordAction->sendOtp($validatedData);

        return response()->json($response, $response['status'] === 'success' ? 200 : 400);
    }

    public function verifyForgotPasswordOtp(
        ForgotPasswordVerifyOtpRequest $request,
        ForgotPasswordAction $forgotPasswordAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $forgotPasswordAction->verifyOtp($validatedData);

        return response()->json($response, $response['status'] === 'success' ? 200 : 400);
    }

    public function resetPassword(
        ForgotPasswordResetRequest $request,
        ForgotPasswordAction $forgotPasswordAction
    ): JsonResponse {
        $validatedData = $request->validated();
        $response = $forgotPasswordAction->resetPassword($validatedData);

        return response()->json($response, $response['status'] === 'success' ? 200 : 400);
    }
}
