<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function image(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,jpg,png,webp,gif|max:5120',
        ]);

        $path = $request->file('image')->store('uploads', 'public');
        $url  = asset('storage/' . $path);

        return response()->json(['success' => true, 'data' => ['url' => $url]]);
    }
}
