<?php

namespace App\Services\Generator;

class AuthenticatedUserTokenGenerator
{
    public static function getValidToken($user): string
    {
        $roleMapping = [
            1 => ['name' => '_AdminToken', 'abilities' => ['server:admin']],
            2 => ['name' => '_UserToken', 'abilities' => ['server:user']],
        ];

        if (isset($roleMapping[$user->role_as])) {
            $tokenData = $roleMapping[$user->role_as];

            return $user->createToken($user->email.$tokenData['name'], $tokenData['abilities'])->plainTextToken;
        }

        return '';
    }
}
