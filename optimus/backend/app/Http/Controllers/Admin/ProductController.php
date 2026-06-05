<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class ProductController extends Controller
{
    public function index(): View
    {
        $products = Product::with('category')->orderBy('created_at', 'desc')->get();
        return view('admin.products.index', compact('products'));
    }

    public function create(): View
    {
        $categories = Category::where('active', true)->orderBy('name')->get();
        return view('admin.products.form', compact('categories'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price'       => 'required|integer|min:0',
            'stock'       => 'nullable|integer|min:0',
            'badge'       => 'nullable|string|max:50',
            'image'       => 'nullable|image|max:2048',
            'active'      => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        $data['active'] = $request->boolean('active', true);

        Product::create($data);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produit créé.');
    }

    public function edit(Product $product): View
    {
        $categories = Category::where('active', true)->orderBy('name')->get();
        return view('admin.products.form', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price'       => 'required|integer|min:0',
            'stock'       => 'nullable|integer|min:0',
            'badge'       => 'nullable|string|max:50',
            'image'       => 'nullable|image|max:2048',
            'active'      => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/' . $request->file('image')->store('products', 'public');
        }

        $data['active'] = $request->boolean('active', true);

        $product->update($data);

        return redirect()->route('admin.products.index')
            ->with('success', 'Produit mis à jour.');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')
            ->with('success', 'Produit supprimé.');
    }
}
