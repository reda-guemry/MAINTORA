<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\CheckList\ChecklistItemsController;
use App\Http\Controllers\CheckList\ChecklistTemplateController;
use App\Http\Controllers\Machine\MachineController;
use App\Http\Controllers\Rounde\MaintenancePlanController;
use App\Http\Controllers\Technician\AnomalyController;
use App\Http\Controllers\Technician\MaintenanceTaskCheckController;
use App\Http\Controllers\Technician\TechnicianMachineController;
use App\Http\Controllers\Technician\TechnicianMaintenanceTaskController;
use App\Http\Controllers\Technician\TechnicianRepairRequestController;
use App\Http\Controllers\Technician\TechnicianController;
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
         *  checklist templates and items management routes
         */

        Route::get('checklist/items/search', [ChecklistItemsController::class, 'search'])->middleware('can:manage technicians');
        Route::get('checklist/templates/search', [ChecklistTemplateController::class, 'search'])->middleware('can:manage technicians');


        Route::get('machines', [MachineController::class, 'getAll'])->middleware('can:manage technicians');
        Route::get('technicians', [TechnicianController::class, 'getAll'])->middleware('can:manage technicians');



        /*
         *  checklist templates and items management routes
         */
        Route::apiResource('checklist/templates', ChecklistTemplateController::class)->middleware('can:manage technicians');
        Route::apiResource('checklist/items', ChecklistItemsController::class)->middleware('can:manage technicians');


        /*
         *  maintenance plans management routes
         */

        Route::apiResource('maintenance-plans', MaintenancePlanController::class)->except(['index', 'show']) ;



    });


    Route::prefix('technician')->middleware(['technician'])->group(function () {

        /*
         *  Technician dashboard routes
         */
        Route::get('machines', [TechnicianMachineController::class, 'index']);
        Route::get('tasks', [TechnicianMaintenanceTaskController::class, 'index']);
        Route::get('tasks/{id}', [TechnicianMaintenanceTaskController::class, 'show']);

        /*
         *  Maintenance task checks routes
         */
        Route::patch('tasks/{id}', [TechnicianMaintenanceTaskController::class, 'update']);
        
        
        /*
         *  Maintenance task check routes
         */
        Route::post('tasks/{id}', [MaintenanceTaskCheckController::class, 'create']);


        /*
         *  Anomalies and repair requests routes
         */
        Route::post('tasks/{taskId}/anomalies', [AnomalyController::class, 'store']);

        /*
         *  Anomalies  requests listing routes
         */
        Route::get('anomalies', [AnomalyController::class, 'index']);
        

    });

});
