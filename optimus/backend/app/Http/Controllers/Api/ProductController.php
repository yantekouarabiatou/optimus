<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::with('category')->active();

        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('badge')) {
            $query->where('badge', $request->badge);
        }

        $products = $query->orderBy('created_at', 'desc')->paginate($request->input('per_page', 20));

        return response()->json(['success' => true, 'data' => $products]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name'        => 'required|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'required|integer|min:0',
            'image'       => 'nullable|string',
            'badge'       => 'nullable|string|max:50',
            'stock'       => 'nullable|integer|min:0',
            'active'      => 'nullable|boolean',
        ]);

        $product = Product::create($data);

        return response()->json(['success' => true, 'data' => $product->load('category')], 201);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $product->load('category')]);
    }

    public function update(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate([
            'category_id' => 'sometimes|exists:categories,id',
            'name'        => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price'       => 'sometimes|integer|min:0',
            'image'       => 'nullable|string',
            'badge'       => 'nullable|string|max:50',
            'stock'       => 'nullable|integer|min:0',
            'active'      => 'nullable|boolean',
        ]);

        $product->update($data);

        return response()->json(['success' => true, 'data' => $product->load('category')]);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json(['success' => true, 'message' => 'Produit supprimé.']);
    }
}
