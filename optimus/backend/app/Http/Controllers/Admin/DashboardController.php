<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Order;
use App\Models\Product;
use Illuminate\View\View;

class DashboardController extends Controller
{
    public function index(): View
    {
        $data = [
            'orders' => [
                'total'      => Order::count(),
                'pending'    => Order::where('status', 'pending')->count(),
                'confirmed'  => Order::where('status', 'confirmed')->count(),
                'processing' => Order::where('status', 'processing')->count(),
                'delivered'  => Order::where('status', 'delivered')->count(),
                'cancelled'  => Order::where('status', 'cancelled')->count(),
                'revenue'    => Order::whereIn('status', ['confirmed', 'processing', 'delivered'])->sum('total'),
            ],
            'products' => [
                'total'     => Product::count(),
                'active'    => Product::where('active', true)->count(),
                'low_stock' => Product::where('stock', '<', 5)->count(),
            ],
            'messages' => [
                'total'  => Contact::count(),
                'unread' => Contact::where('is_read', false)->count(),
            ],
            'recent_orders' => Order::with('items')->latest()->take(5)->get(),
        ];

        return view('admin.dashboard', compact('data'));
    }
}
