<?php

namespace App\Http\Controllers\Machine;

use App\Http\Controllers\Controller;
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

        return response()->json([
            'success' => true,
            'message' => 'Machines retrieved successfully',
            'data' => $data,
        ]);
    }

    public function store(StoreMachineRequest $request)
    {
        try{
            $machine = $this -> machineService -> create($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Machine created successfully',
                'data' => MachineResource::make($machine),
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while creating machine.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function show(int $id)
    {
        try{
            $machine = $this -> machineService -> findOrFail($id);
            return response()->json([
                'success' => true,
                'message' => 'Machine retrieved successfully',
                'data' => MachineResource::make($machine),
            ]);
        }catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Machine not found.',
            ], 404);
        }catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error occurred while retrieving machine.',
                'error' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }
    
    public function update(UpdateMachineRequest $request, int $id)
    {
        try{
            $machine = $this -> machineService -> update($id , $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Machine updated successfully',
                'data' => MachineResource::make($machine),
            ]);

        }catch( ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Machine not found.',
            ], 404);
        }
    }

    public function destroy(int $id)
    {
        try{
            $this -> machineService -> delete($id);

            return response()->json([
                'success' => true,
                'message' => 'Machine deleted successfully',
            ]);
        }catch( ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Machine not found.',
            ], 404);
        }
    }


}
