<?php

use App\Http\Controllers\MatrimonyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('sign-in', [UserController::class, 'userSignIn']);

Route::post('/matrimony-create', [MatrimonyController::class, 'Create']);
Route::get('/matrimony-all', [MatrimonyController::class, 'getAll']);
Route::delete('/matrimony-delete/{id}', [MatrimonyController::class, 'delete']);
