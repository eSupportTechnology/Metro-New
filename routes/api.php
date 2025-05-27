<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\MatrimonyLogController;
use App\Http\Controllers\NicController;
use App\Http\Controllers\TestSmsController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminUserCheckMiddleware;
use App\Http\Middleware\FollowerUserCheckMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);
Route::post('logout', [UserController::class, 'userLogout'])->middleware('auth:sanctum');

Route::prefix('phone')->group(function () {
    Route::post('send-otp', [UserController::class, 'sendOtp']);
    Route::post('verify-otp', [UserController::class, 'verifyOtp']);
    Route::post('register', [UserController::class, 'phoneRegister']);
});

Route::prefix('test-sms')->group(function () {
    Route::get('status', [TestSmsController::class, 'checkStatus']);
    Route::post('send', [TestSmsController::class, 'testSms']);
});

Route::get('/get-active-matrimony', [MatrimonyController::class, 'getActiveMatrimony']);
Route::get('/get-homepage-profiles', [MatrimonyController::class, 'getHomepageProfiles']);
Route::get('/get-all-blogs', [BlogController::class, 'getAllBlogs']);
Route::get('/blog-detail/{id}', [BlogController::class, 'getBlogById']);

Route::middleware(['auth:sanctum', FollowerUserCheckMiddleware::class])->group(function () {

    //user
    Route::get('/user/{id}', [UserController::class, 'getUserDetails']);
    Route::get('/get-profile/{profileId}', [MatrimonyController::class, 'getProfile']);

    //Matrimony
    Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
    Route::delete('/delete-matrimony-profile/{userId}', [MatrimonyController::class, 'deleteMatrimonyProfile']);
});

Route::middleware(['auth:sanctum', AdminUserCheckMiddleware::class])->group(function () {

    //Matrimony
    Route::get('/get-matrimony', [MatrimonyController::class, 'getAllMatrimony']);

    Route::post('matrimony/{matrimonyId}/update-boot-post', [MatrimonyController::class, 'updateBootPost']);
    Route::post('matrimony/{matrimonyId}/update-package-number', [MatrimonyController::class, 'updatePackageNumber']);
    Route::post('matrimony/{id}/update-active-status', [MatrimonyController::class, 'updateActiveStatus']);

    //Blog
    Route::post('/blog-create', [BlogController::class, 'createBlog']);
    Route::post('/blog-update/{id}', [BlogController::class, 'updateBlog']);
    Route::delete('/blog-delete/{id}', [BlogController::class, 'deleteBlog']);

    //NIC
    Route::get('/nic-details', [NicController::class, 'getAllNic']);
    Route::post('/nic-verification/{nicNumber}/verify', [NicController::class, 'verifyNic']);
    Route::post('/nic-verification/{nicNumber}/reject', [NicController::class, 'rejectNic']);
    Route::get('/nic-verification/{nicNumber}', [NicController::class, 'getNicDetail']);

    //Log
    Route::get('/matrimony-logs', [MatrimonyLogController::class, 'getAllLogs']);

});
Route::get('/dashboard/stats', [DashboardController::class, 'getDashboardStats']);
Route::get('/dashboard/monthly-stats', [DashboardController::class, 'getMonthlyStats']);
