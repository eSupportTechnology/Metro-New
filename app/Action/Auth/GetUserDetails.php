<?php

namespace App\Action\Auth;

use App\Models\User;
use App\Response\CommonResponse;

class GetUserDetails
{
    public function __invoke(string $userId): array
    {
        $user = User::find($userId);

        if (!$user) {
            return CommonResponse::sendBadRequestResponse('User');
        }

        $userData = [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
        ];

        return CommonResponse::sendSuccessResponseWithData(
            'User details retrieved successfully',
            $userData
        );
    }
}
