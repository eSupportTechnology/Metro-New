<?php

use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);

Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
