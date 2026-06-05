<?php

namespace App\Providers;

use App\Models\Contact;
use App\Models\Order;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class ViewServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::composer('layouts.admin', function ($view) {
            if (auth()->check()) {
                $view->with([
                    'pendingOrders'   => Order::where('status', 'pending')->count(),
                    'unreadMessages'  => Contact::where('is_read', false)->count(),
                ]);
            }
        });
    }
}
