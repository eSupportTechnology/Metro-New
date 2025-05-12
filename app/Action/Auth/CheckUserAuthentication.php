<?php

namespace App\Action\Auth;

use App\Models\User;
use App\Services\Response\AuthenticationResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CheckUserAuthentication
{
    public function __invoke(array $validatedUserSignInRequest): array
    {
        $user = User::where('email', $validatedUserSignInRequest['email'])->first();

        if (!$user) {
            return AuthenticationResponse::sendUserNotFoundResponse();
        }

        if ($this->isUserExisting($user, $validatedUserSignInRequest)) {
            return AuthenticationResponse::sendUserSendAuthenticatedResponse($user);
        }

        return AuthenticationResponse::sendUserUnauthenticatedResponse();
    }

    private function isUserExisting($user, array $request): bool
    {
        return $user->email == $request['email'] && Hash::check($request['password'], $user->password);
    }


    public function logout(): array
    {
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });

        Auth::user()->currentAccessToken()->delete();
        return [
            'status' => 'success',
            'message' => 'User logged out successfully.',
        ];
    }
}
