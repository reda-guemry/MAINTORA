<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;



class UserSeeder extends Seeder
{
    
    public function run(): void
    {

    $admin = User::create([
            'first_name' => 'System',
            'last_name' => 'Administrator',
            'email' => 'admin@example.com',
            'password' => Hash::make('12345678'),
            'phone' => '+1-800-ADMIN',
            'status' => 'active',
        ]);
        $admin->assignRole('admin');
        $this->command->info('Created admin user: admin@example.com');

        $this->createUsersWithRole('admin', 2);

        $this->createUsersWithRole('client', 5);

        $this->createUsersWithRole('chef technician', 3);

        $this->createUsersWithRole('technician', 8);

        $this->command->info('All users created successfully.');
    }

    
    private function createUsersWithRole(string $role, int $count): void
    {
        $users = User::factory($count)->create();

        foreach ($users as $user) {
            $user->assignRole($role);
        }

        $this->command->line("Created {$count} {$role} user(s)");
    }
}
