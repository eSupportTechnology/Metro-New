<?php

namespace App\Services\Response;

use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use App\Services\Generator\AuthenticatedUserTokenGenerator;

class AuthenticationResponse
{
    public static function sendUserNotFoundResponse(): array
    {
        return [
            'status' => Response::HTTP_UNAUTHORIZED,
            'message' => 'User not found! Please check your email',
        ];
    }

    public static function sendUserUnauthenticatedResponse(): array
    {
        return [
            'status' => Response::HTTP_UNAUTHORIZED,
            'message' => Response::$statusTexts[Response::HTTP_UNAUTHORIZED],
        ];
    }

    public static function sendUserSendAuthenticatedResponse(User $user): array
    {
        return [
            'userId' => $user->id,
            'token' => AuthenticatedUserTokenGenerator::getValidToken($user),
            'userRole' => $user->role_as,
            'firstName' => $user->first_name,
            'lastName' => $user->last_name,
            'email' => $user->email,
            'religion' => $user->religion,
            'phone' => $user->phone,
        ];
    }
}
