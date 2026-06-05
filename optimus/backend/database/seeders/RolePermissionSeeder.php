<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'products.view',
            'products.create',
            'products.edit',
            'products.delete',
            'categories.manage',
            'orders.manage',
            'contacts.manage',
            'dashboard.view',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions($permissions);

        $editor = Role::firstOrCreate(['name' => 'editor']);
        $editor->syncPermissions(['products.view', 'products.create', 'products.edit']);

        // Compte admin par défaut (changer le mot de passe en production)
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@optimussolutions.com'],
            [
                'name'     => 'Administrateur',
                'password' => bcrypt('Optimus@2024!'),
            ]
        );
        $adminUser->assignRole('admin');

        $this->command->info('Rôles, permissions et compte admin créés.');
    }
}
