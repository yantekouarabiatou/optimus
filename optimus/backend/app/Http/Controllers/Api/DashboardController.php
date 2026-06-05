<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function notifications(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => [
                'pending_orders'   => Order::where('status', 'pending')->count(),
                'unread_messages'  => Contact::where('is_read', false)->count(),
            ],
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => [
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
                    'total'    => Product::count(),
                    'active'   => Product::where('active', true)->count(),
                    'low_stock' => Product::where('stock', '<', 5)->count(),
                ],
                'messages' => [
                    'total'  => Contact::count(),
                    'unread' => Contact::where('is_read', false)->count(),
                ],
                'recent_orders' => Order::with('items')
                    ->latest()
                    ->take(5)
                    ->get(),
            ],
        ]);
    }
}
