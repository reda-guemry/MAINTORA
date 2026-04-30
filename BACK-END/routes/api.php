<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Anomaly\AnomalyController;
use App\Http\Controllers\Anomaly\RepairPurchaseOrderController;
use App\Http\Controllers\Anomaly\RepairRequestController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\RoleController;
use App\Http\Controllers\CheckList\ChecklistItemsController;
use App\Http\Controllers\CheckList\ChecklistTemplateController;
use App\Http\Controllers\Client\ClientDashboardController;
use App\Http\Controllers\Client\ClientRepairRequestController;
use App\Http\Controllers\Machine\MachineController;
use App\Http\Controllers\Machine\MachineHistoryController;
use App\Http\Controllers\Rounde\MaintenancePlanController;
use App\Http\Controllers\Technician\MaintenanceTaskCheckController;
use App\Http\Controllers\Technician\TechnicianMachineController;
use App\Http\Controllers\Technician\TechnicianMaintenanceTaskController;
use App\Http\Controllers\Technician\TechnicianController;
use Illuminate\Support\Facades\Route;



Route::post('/login', [AuthController::class, 'login']);
Route::post('/refresh', [AuthController::class, 'refresh']);
Route::post('/logout', [AuthController::class, 'logout']);




Route::middleware(['auth:api'])->group(function () {

    
    Route::prefix('admin')->middleware(['admin'])->group(function () {

        
        Route::apiResource('users', UserController::class)->middleware('can:manage users');
        Route::get('/roles', [RoleController::class, 'index'])->middleware('can:manage users');
        Route::get('machines/{machineId}/history', [MachineHistoryController::class, 'index']);
        Route::get('machines/{machineId}/history/{taskId}', [MachineHistoryController::class, 'show']);

    });





    Route::prefix('client')->middleware(['client'])->group(function () {

        Route::get('dashboard', [ClientDashboardController::class, 'index'])->middleware('can:manage machines');

        Route::get('machines/all', [MachineController::class, 'getMine'])->middleware('can:manage machines');
        Route::get('machines/{machineId}/history', [MachineHistoryController::class, 'index'])->middleware('can:manage machines');
        Route::get('machines/{machineId}/history/{taskId}', [MachineHistoryController::class, 'show'])->middleware('can:manage machines');
        Route::apiResource('machines', MachineController::class)->middleware('can:manage machines');

        
        Route::get('repair-requests', [ClientRepairRequestController::class, 'index'])->middleware('can:manage machines');
        Route::get('repair-requests/{id}', [ClientRepairRequestController::class, 'show'])->middleware('can:manage machines');
        Route::post('repair-requests/{id}/purchase-orders', [RepairPurchaseOrderController::class, 'store'])->middleware('can:manage machines');

    });

    Route::prefix('chef-technician')->middleware(['chef-technician'])->group(function () {


       

        Route::get('checklist/items/search', [ChecklistItemsController::class, 'search'])->middleware('can:manage technicians');
        Route::get('checklist/templates/search', [ChecklistTemplateController::class, 'search'])->middleware('can:manage technicians');


        Route::get('machines', [MachineController::class, 'getAll'])->middleware('can:manage technicians');
        Route::get('machines/{machineId}/history', [MachineHistoryController::class, 'index'])->middleware('can:manage technicians');
        Route::get('machines/{machineId}/history/{taskId}', [MachineHistoryController::class, 'show'])->middleware('can:manage technicians');
        Route::get('technicians', [TechnicianController::class, 'getAll'])->middleware('can:manage technicians');



        Route::apiResource('checklist/templates', ChecklistTemplateController::class)->middleware('can:manage technicians');
        Route::apiResource('checklist/items', ChecklistItemsController::class)->middleware('can:manage technicians');


        Route::apiResource('maintenance-plans', MaintenancePlanController::class)->except(['index', 'show']) ;

        
        Route::get('anomalies', [AnomalyController::class, 'index'])->middleware('can:manage technicians');
        Route::get('anomalies/{id}', [AnomalyController::class, 'show'])->middleware('can:manage technicians');
        Route::post('anomalies/{id}/repair-requests', [RepairRequestController::class, 'store'])->middleware('can:manage technicians');
        Route::patch('repair-requests/{id}/purchase-order/review', [RepairPurchaseOrderController::class, 'review'])->middleware('can:manage technicians');



    });


    Route::prefix('technician')->middleware(['technician'])->group(function () {

       
        Route::get('machines', [TechnicianMachineController::class, 'index']);

        Route::get('machines/{machineId}/history', [MachineHistoryController::class, 'index']);
        Route::get('machines/{machineId}/history/{taskId}', [MachineHistoryController::class, 'show']);
        
        Route::get('tasks', [TechnicianMaintenanceTaskController::class, 'index']);
        Route::get('tasks/{id}', [TechnicianMaintenanceTaskController::class, 'show']);
        Route::get('technician/statistics' , [TechnicianController::class, 'statistics']);


        Route::patch('tasks/{id}', [TechnicianMaintenanceTaskController::class, 'update']);
        
        
        
        Route::post('tasks/{id}', [MaintenanceTaskCheckController::class, 'create']);


        
        Route::post('tasks/{taskId}/anomalies', [AnomalyController::class, 'store']);

        
        Route::get('anomalies', [AnomalyController::class, 'index']);
        

    });

});
