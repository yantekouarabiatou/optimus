<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

class BoutiqueController extends Controller
{
    public function index(): View
    {
        $categories = Category::withCount('products')->where('active', true)->get();
        $products   = Product::with('category')->where('active', true)->get();

        return view('boutique', compact('categories', 'products'));
    }

    public function order(Request $request)
    {
        $data = $request->validate([
            'customer_name'    => 'required|string|max:255',
            'customer_phone'   => 'nullable|string|max:30',
            'customer_address' => 'nullable|string',
            'items'                 => 'required|array|min:1',
            'items.*.product_name'  => 'required|string|max:255',
            'items.*.product_price' => 'required|integer|min:0',
            'items.*.quantity'      => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($data) {
            $total = 0;
            $items = [];

            foreach ($data['items'] as $item) {
                $subtotal = $item['product_price'] * $item['quantity'];
                $total   += $subtotal;
                $items[]  = [
                    'product_name'  => $item['product_name'],
                    'product_price' => $item['product_price'],
                    'quantity'      => $item['quantity'],
                    'subtotal'      => $subtotal,
                ];
            }

            $order = Order::create([
                'customer_name'    => $data['customer_name'],
                'customer_phone'   => $data['customer_phone'] ?? null,
                'customer_address' => $data['customer_address'] ?? null,
                'total'            => $total,
                'status'           => 'pending',
            ]);

            $order->items()->createMany($items);

            return $order;
        });

        return response()->json([
            'success'   => true,
            'reference' => $order->reference,
        ]);
    }
}
