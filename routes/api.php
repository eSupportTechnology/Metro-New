<?php

use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminUserCheckMiddleware;
use App\Http\Middleware\FollowerUserCheckMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);
Route::post('logout', [UserController::class, 'userLogout'])->middleware('auth:sanctum');


Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
Route::get('/get-matrimony', [MatrimonyController::class, 'getAllMatrimony']);

Route::delete('/delete-matrimony-profile/{userId}', [MatrimonyController::class, 'deleteMatrimonyProfile']);
Route::post('matrimony/{matrimonyId}/update-boot-post', [MatrimonyController::class, 'updateBootPost']);
Route::post('matrimony/{matrimonyId}/update-package-number', [MatrimonyController::class, 'updatePackageNumber']);


Route::middleware(['auth:sanctum', FollowerUserCheckMiddleware::class])->group(function () {
    Route::get('/get-profile/{profileId}', [MatrimonyController::class, 'getProfile']);
});


//Route::middleware(['auth:sanctum', AdminUserCheckMiddleware::class])->group(function () {
//    Route::get('/get-profile/{profileId}', [MatrimonyController::class, 'getProfile']);
//});
