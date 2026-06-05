<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RolePermissionSeeder::class);

        // Catégories
        $cats = [
            ['name' => 'Équipements IT',      'icon' => 'Monitor',     'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80'],
            ['name' => 'Composants Énergie',  'icon' => 'Cpu',         'image' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80'],
            ['name' => 'Matériaux Réseau',    'icon' => 'Network',     'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'],
            ['name' => 'Accessoires Sécurité','icon' => 'ShieldCheck', 'image' => 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80'],
        ];
        foreach ($cats as $c) {
            Category::firstOrCreate(['name' => $c['name']], $c);
        }

        // Produits
        $products = [
            ['cat' => 'Équipements IT',      'name' => 'Serveur Dell PowerEdge R750',  'price' => 2500000, 'badge' => 'Nouveau', 'stock' => 5,  'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80'],
            ['cat' => 'Composants Énergie',  'name' => 'Panneau Solaire 450W Mono',    'price' => 185000,  'badge' => 'Promo',   'stock' => 50, 'image' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&q=80'],
            ['cat' => 'Matériaux Réseau',    'name' => 'Switch Cisco Catalyst 9200',   'price' => 890000,  'badge' => null,      'stock' => 8,  'image' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'],
            ['cat' => 'Accessoires Sécurité','name' => 'Caméra IP Hikvision 4MP',     'price' => 75000,   'badge' => 'Nouveau', 'stock' => 20, 'image' => 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80'],
            ['cat' => 'Équipements IT',      'name' => 'Onduleur APC 3000VA',          'price' => 450000,  'badge' => null,      'stock' => 12, 'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80'],
            ['cat' => 'Composants Énergie',  'name' => 'Batterie Lithium 200Ah',       'price' => 320000,  'badge' => 'Promo',   'stock' => 15, 'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80'],
            ['cat' => 'Matériaux Réseau',    'name' => 'Routeur MikroTik CCR2004',     'price' => 560000,  'badge' => null,      'stock' => 7,  'image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80'],
            ['cat' => 'Accessoires Sécurité','name' => "Contrôleur d'accès ZKTeco",   'price' => 125000,  'badge' => 'Nouveau', 'stock' => 10, 'image' => 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80'],
        ];
        foreach ($products as $p) {
            $cat = Category::where('name', $p['cat'])->first();
            if ($cat) {
                Product::firstOrCreate(['name' => $p['name']], [
                    'category_id' => $cat->id,
                    'price'       => $p['price'],
                    'badge'       => $p['badge'],
                    'stock'       => $p['stock'],
                    'image'       => $p['image'],
                    'active'      => true,
                ]);
            }
        }
    }
}
