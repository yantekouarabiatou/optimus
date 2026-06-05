<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\HomeController;
use App\Http\Controllers\Web\BoutiqueController;
use App\Http\Controllers\Admin\LoginController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\NotificationController;

// ── Site public ───────────────────────────────────────────────────────────────
Route::get('/',         [HomeController::class, 'index'])->name('home');
Route::post('/contact', [HomeController::class, 'contact'])->name('contact.store');

Route::get('/boutique',       [BoutiqueController::class, 'index'])->name('boutique');
Route::post('/boutique/order',[BoutiqueController::class, 'order'])->name('boutique.order');

// ── Admin auth ────────────────────────────────────────────────────────────────
Route::get('/admin/login',  [LoginController::class, 'showForm'])->name('admin.login')->middleware('guest');
Route::post('/admin/login', [LoginController::class, 'login'])->name('admin.login.post');
Route::post('/admin/logout',[LoginController::class, 'logout'])->name('admin.logout');

// ── Admin (protégé) ───────────────────────────────────────────────────────────
Route::prefix('admin')->name('admin.')->middleware('admin')->group(function () {

    Route::get('/',        [DashboardController::class, 'index'])->name('dashboard');

    // Commandes
    Route::get('/orders',                      [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/{order}',              [OrderController::class, 'show'])->name('orders.show');
    Route::patch('/orders/{order}/status',     [OrderController::class, 'updateStatus'])->name('orders.status');
    Route::delete('/orders/{order}',           [OrderController::class, 'destroy'])->name('orders.destroy');

    // Produits
    Route::get('/products',           [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create',    [ProductController::class, 'create'])->name('products.create');
    Route::post('/products',          [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Catégories
    Route::get('/categories',             [CategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories',            [CategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{category}',  [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Messages
    Route::get('/contacts',                        [ContactController::class, 'index'])->name('contacts.index');
    Route::get('/contacts/{contact}',              [ContactController::class, 'show'])->name('contacts.show');
    Route::patch('/contacts/{contact}/read',       [ContactController::class, 'markAsRead'])->name('contacts.read');
    Route::delete('/contacts/{contact}',           [ContactController::class, 'destroy'])->name('contacts.destroy');

    // Notifications
    Route::get('/notifications',                   [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/mark-all-read',    [NotificationController::class, 'markAllRead'])->name('notifications.markAllRead');

    // Utilisateurs
    Route::get('/users',          [UserController::class, 'index'])->name('users.index');
    Route::delete('/users/{user}',[UserController::class, 'destroy'])->name('users.destroy');

    // Profil
    Route::get('/profile',  [ProfileController::class, 'index'])->name('profile');
    Route::put('/profile',  [ProfileController::class, 'update'])->name('profile.update');
});
