<?php

namespace App\Http\Controllers\Machine;

use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiResponse;
use App\Http\Requests\StoreMachineRequest;
use App\Http\Requests\UpdateMachineRequest;
use App\Http\Resources\MachineResource;
use App\Services\Machine\MachineService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MachineController extends Controller
{
    public function __construct(
        private MachineService $machineService,
    ){}


    public function index()
    {
        $data = $this->machineService->getPaginate();

        $data->through(function ($machine) {
            return new MachineResource($machine);
        });

        return ApiResponse::success($data, 'Machines retrieved successfully');
    }

    public function store(StoreMachineRequest $request)
    {
        try{
            $machine = $this -> machineService -> create($request->validated());
            return ApiResponse::success(MachineResource::make($machine), 'Machine created successfully', 201);
        } catch (Exception $e) {
            return ApiResponse::error('Error occurred while creating machine', 500);
        }
    }

    public function show(int $id)
    {
        try{
            $machine = $this -> machineService -> findOrFail($id);
            return ApiResponse::success(MachineResource::make($machine), 'Machine retrieved successfully');
        }catch (ModelNotFoundException $e) {
            return ApiResponse::error('Machine not found', 404);
        }catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving machine', 500);
        }
    }
    
    public function update(UpdateMachineRequest $request, int $id)
    {
        try{
            $machine = $this -> machineService -> findOrFail($id);

            // Authorization check - verify machine belongs to authenticated user
            if ((int) $machine->created_by !== (int) auth('api')->id()) {
                return ApiResponse::error('Unauthorized', 403);
            }

            $machine = $this -> machineService -> update($id , $request->validated());

            return ApiResponse::success(MachineResource::make($machine), 'Machine updated successfully');

        }catch( ModelNotFoundException $e) {
            return ApiResponse::error('Machine not found', 404);
        }catch (Exception $e) {
            return ApiResponse::error('Error occurred while updating machine', 500);
        }
    }

    public function destroy(int $id)
    {
        try{
            $machine = $this -> machineService -> findOrFail($id);

            // Authorization check - verify machine belongs to authenticated user
            if ((int) $machine->created_by !== (int) auth('api')->id()) {
                return ApiResponse::error('Unauthorized', 403);
            }

            $this -> machineService -> delete($id);

            return ApiResponse::success(null, 'Machine deleted successfully');
        }catch( ModelNotFoundException $e) {
            return ApiResponse::error('Machine not found', 404);
        }catch (Exception $e) {
            return ApiResponse::error('Error occurred while deleting machine', 500);
        }
    }


    public function getAll()
    {
        try{
            $machines = $this -> machineService -> getAll();
            return ApiResponse::success(MachineResource::collection($machines), 'Machines retrieved successfully');
        }catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving machines', 500);
        }
    }

    public function getMine()
    {
        try{
            $machines = $this->machineService->getMine();

            return ApiResponse::success(MachineResource::collection($machines), 'Client machines retrieved successfully');
        }catch (Exception $e) {
            return ApiResponse::error('Error occurred while retrieving client machines', 500);
        }
    }


}
