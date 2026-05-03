<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;




class RoleSeeder extends Seeder
{
    
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->createPermissions();

        $this->createRoles();

        $this->command->info('Roles and permissions seeded successfully.');
    }

    private function createPermissions(): void
    {
        $permissions = [
            'manage users',
            'manage roles',
            'manage machines',
            'manage technicians',
            'manage maintenance plans',
            'manage anomalies',
            'manage repair requests',
            'manage checklists',
            'view reports',
            'view dashboard',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'api');
        }
    }


    private function createRoles(): void
    {
        $adminRole = Role::findOrCreate('admin', 'api');

        $adminRole->syncPermissions(Permission::all());


        $clientRole = Role::findOrCreate('client', 'api');

        $clientRole->syncPermissions([
            'manage machines',
            'view dashboard',
        ]);

        $chefTechRole = Role::findOrCreate('chef technician', 'api');
        $chefTechRole->syncPermissions([
            'manage technicians',
            'manage maintenance plans',
            'manage anomalies',
            'manage repair requests',
            'manage checklists',
            'view reports',
            'view dashboard',
        ]);

        $techRole = Role::findOrCreate('technician', 'api');
        $techRole->syncPermissions([
            'manage maintenance plans',
            'view dashboard',
        ]);
    }
}
