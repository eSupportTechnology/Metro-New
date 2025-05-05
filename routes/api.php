<?php

use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);

Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
Route::get('/get-matrimony', [MatrimonyController::class, 'getAllMatrimony']);
Route::delete('/delete-matrimony-profile/{userId}', [MatrimonyController::class, 'deleteMatrimonyProfile']);
