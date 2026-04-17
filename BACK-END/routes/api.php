<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\CheckList\ChecklistItemsController;
use App\Http\Controllers\CheckList\ChecklistTemplateController;
use App\Http\Controllers\Machine\MachineController;
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
        Route::apiResource('users', UserController::class)->middleware('can:manage users');
        Route::get('/roles', [RoleController::class, 'index'])->middleware('can:manage users');

    });





    Route::prefix('client')->middleware(['client'])->group(function () {

        /*
         * Manage users Routes
         */
        Route::apiResource('machines', MachineController::class)->middleware('can:manage machines');

    });

    Route::prefix('chef-technician')->middleware(['chef-technician'])->group(function () {

        /*
         * Manage users Routes
         */
        Route::apiResource('checklist', ChecklistTemplateController::class)->middleware('can:manage technicians');
        Route::apiResource('checklist-items', ChecklistItemsController::class)->middleware('can:manage technicians');

    });


});
    
