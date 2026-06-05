<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $orders = Order::with('items')
            ->when($request->status, fn ($q) => $q->where('status', $request->status))
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'customer_name'    => 'required|string|max:255',
            'customer_email'   => 'nullable|email',
            'customer_phone'   => 'nullable|string|max:30',
            'customer_address' => 'nullable|string',
            'notes'            => 'nullable|string',
            'items'                  => 'required|array|min:1',
            'items.*.product_id'     => 'nullable|exists:products,id',
            'items.*.product_name'   => 'required_without:items.*.product_id|string|max:255',
            'items.*.product_price'  => 'required_without:items.*.product_id|integer|min:0',
            'items.*.quantity'       => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($data) {
            $total = 0;
            $items = [];

            foreach ($data['items'] as $item) {
                if (!empty($item['product_id'])) {
                    $product       = Product::findOrFail($item['product_id']);
                    $productName   = $product->name;
                    $productPrice  = $product->price;
                    $productId     = $product->id;
                } else {
                    $productName   = $item['product_name'];
                    $productPrice  = $item['product_price'];
                    $productId     = null;
                }

                $subtotal = $productPrice * $item['quantity'];
                $total   += $subtotal;

                $items[] = [
                    'product_id'    => $productId,
                    'product_name'  => $productName,
                    'product_price' => $productPrice,
                    'quantity'      => $item['quantity'],
                    'subtotal'      => $subtotal,
                ];
            }

            $order = Order::create([
                'customer_name'    => $data['customer_name'],
                'customer_email'   => $data['customer_email'] ?? null,
                'customer_phone'   => $data['customer_phone'] ?? null,
                'customer_address' => $data['customer_address'] ?? null,
                'notes'            => $data['notes'] ?? null,
                'total'            => $total,
                'status'           => 'pending',
            ]);

            $order->items()->createMany($items);

            return $order;
        });

        return response()->json([
            'success'   => true,
            'message'   => 'Commande créée avec succès.',
            'data'      => $order->load('items'),
            'reference' => $order->reference,
        ], 201);
    }

    public function show(Order $order): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $order->load('items')]);
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:pending,confirmed,processing,delivered,cancelled',
        ]);

        $order->update(['status' => $request->status]);

        return response()->json(['success' => true, 'data' => $order]);
    }

    public function destroy(Order $order): JsonResponse
    {
        $order->delete();

        return response()->json(['success' => true, 'message' => 'Commande supprimée.']);
    }
}
