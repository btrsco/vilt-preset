<?php

namespace Database\Seeders\Universal;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name'  => 'Administrator',
            'email' => 'admin@example.test',
            'role'  => UserRole::ROOT,
        ]);
    }
}
