<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;


class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions() ;
        
        /* * Create permissions
         */
        Permission::findOrCreate('manage users', 'api');
        Permission::findOrCreate('manage roles', 'api');
        Permission::findOrCreate('manage machines', 'api');




        /* * Create roles and assign existing permissions
         */
        $roleAdmin = Role::findOrCreate('admin' , 'api');
        $roleAdmin->givePermissionTo(Permission::all());


        /* 
        * Create a regular user role without permissions
         */
        $roleClient = Role::findOrCreate('client' , 'api');
        $roleClient->givePermissionTo([Permission::where('name', 'manage machines')->first()]) ; 


    }
}
