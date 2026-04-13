<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\RoleRessource;
use Spatie\Permission\Models\Role;

class RoleController
{

    public function __construct(

    ){}


    public function index()
    {
        $roles = Role::all();

        return response()->json([
            'success' => true,
            'message' => 'Roles retrieved successfully',
            'data' => RoleRessource::collection($roles),
        ]);
    }
}
