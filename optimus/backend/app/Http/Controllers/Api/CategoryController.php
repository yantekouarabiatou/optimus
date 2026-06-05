<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = Category::where('active', true)
            ->withCount(['products' => fn ($q) => $q->where('active', true)])
            ->orderBy('name')
            ->get();

        return response()->json(['success' => true, 'data' => $categories]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'icon'  => 'nullable|string|max:100',
            'image' => 'nullable|string',
        ]);

        $category = Category::create($data);

        return response()->json(['success' => true, 'data' => $category], 201);
    }

    public function show(Category $category): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => $category->loadCount(['products' => fn ($q) => $q->where('active', true)]),
        ]);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $data = $request->validate([
            'name'   => 'sometimes|string|max:255',
            'icon'   => 'nullable|string|max:100',
            'image'  => 'nullable|string',
            'active' => 'sometimes|boolean',
        ]);

        $category->update($data);

        return response()->json(['success' => true, 'data' => $category]);
    }

    public function destroy(Category $category): JsonResponse
    {
        $category->delete();

        return response()->json(['success' => true, 'message' => 'Catégorie supprimée.']);
    }
}
