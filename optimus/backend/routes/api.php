<?php

use Illuminate\Support\Facades\Route;

// ── Routes publiques ─────────────────────────────────────────────────────────
Route::prefix('v1')->group(function () {

    Route::post('/auth/login',    [\App\Http\Controllers\Api\AuthController::class, 'login']);
    Route::post('/auth/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);

    // Catalogue public (lecture seule)
    Route::get('/categories',          [\App\Http\Controllers\Api\CategoryController::class, 'index']);
    Route::get('/categories/{category}',[\App\Http\Controllers\Api\CategoryController::class, 'show']);
    Route::get('/products',            [\App\Http\Controllers\Api\ProductController::class,  'index']);
    Route::get('/products/{product}',  [\App\Http\Controllers\Api\ProductController::class,  'show']);

    // Commande publique
    Route::post('/orders',  [\App\Http\Controllers\Api\OrderController::class,  'store']);

    // Formulaire de contact
    Route::post('/contact', [\App\Http\Controllers\Api\ContactController::class, 'store']);
});

// ── Routes authentifiées (Sanctum) ───────────────────────────────────────────
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {

    Route::post('/auth/logout',          [\App\Http\Controllers\Api\AuthController::class, 'logout']);
    Route::get('/auth/me',               [\App\Http\Controllers\Api\AuthController::class, 'me']);
    Route::put('/auth/profile',          [\App\Http\Controllers\Api\AuthController::class, 'updateProfile']);
});

// ── Routes admin (Sanctum + rôle admin via Spatie) ───────────────────────────
Route::prefix('v1')->middleware(['auth:sanctum', 'role:admin'])->group(function () {

    // Gestion des produits (création / modification / suppression)
    Route::apiResource('products', \App\Http\Controllers\Api\ProductController::class)
         ->except(['index', 'show']);

    // Gestion des catégories
    Route::apiResource('categories', \App\Http\Controllers\Api\CategoryController::class)
         ->except(['index', 'show']);

    // Gestion des commandes
    Route::get('/orders',                    [\App\Http\Controllers\Api\OrderController::class,  'index']);
    Route::get('/orders/{order}',            [\App\Http\Controllers\Api\OrderController::class,  'show']);
    Route::patch('/orders/{order}/status',   [\App\Http\Controllers\Api\OrderController::class,  'updateStatus']);
    Route::delete('/orders/{order}',         [\App\Http\Controllers\Api\OrderController::class,  'destroy']);

    // Messages de contact
    Route::get('/contact',                   [\App\Http\Controllers\Api\ContactController::class, 'index']);
    Route::patch('/contact/{contact}/read',  [\App\Http\Controllers\Api\ContactController::class, 'markAsRead']);
    Route::delete('/contact/{contact}',      [\App\Http\Controllers\Api\ContactController::class, 'destroy']);

    // Upload fichier
    Route::post('/upload', [\App\Http\Controllers\Api\UploadController::class, 'image']);

    // Dashboard
    Route::get('/dashboard/stats',           [\App\Http\Controllers\Api\DashboardController::class, 'stats']);
    Route::get('/dashboard/notifications',   [\App\Http\Controllers\Api\DashboardController::class, 'notifications']);

    // Utilisateurs
    Route::get('/users',               [\App\Http\Controllers\Api\UserController::class, 'index']);
    Route::put('/users/{user}/roles',  [\App\Http\Controllers\Api\UserController::class, 'updateRoles']);
    Route::delete('/users/{user}',     [\App\Http\Controllers\Api\UserController::class, 'destroy']);

    // Permissions
    Route::get('/permissions',         [\App\Http\Controllers\Api\PermissionController::class, 'index']);
});
