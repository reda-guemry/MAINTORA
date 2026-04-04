<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/********** API Routes **********/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/logout', [AuthController::class, 'logout']);


/**
 *  Protected routes
 */

Route::middleware(['auth:api'])->group(function () {

    /*
     * Admin routes
     */
    Route::prefix('admin')->middleware(['admin'])->group(function () {

        /*
         * Manage users Routes
         */
        Route::apiResource('users', UserController::class);


    });


});



