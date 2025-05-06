<?php

use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);

Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
Route::get('/get-matrimony', [MatrimonyController::class, 'getAllMatrimony']);
Route::get('/get-profile/{profileId}', [MatrimonyController::class, 'getProfile']);
Route::delete('/delete-matrimony-profile/{userId}', [MatrimonyController::class, 'deleteMatrimonyProfile']);
Route::post('matrimony/{matrimonyId}/update-boot-post', [MatrimonyController::class, 'updateBootPost']);
Route::post('matrimony/{matrimonyId}/update-package-number', [MatrimonyController::class, 'updatePackageNumber']);
