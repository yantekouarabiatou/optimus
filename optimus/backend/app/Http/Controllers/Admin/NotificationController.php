<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\Order;
use Illuminate\View\View;

class NotificationController extends Controller
{
    public function index(): View
    {
        $unreadMessages = Contact::where('is_read', false)
            ->orderBy('created_at', 'desc')
            ->get();

        $pendingOrders = Order::where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();

        $recentOrders = Order::whereIn('status', ['confirmed', 'processing'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Flux unifié trié par date
        $feed = collect();

        foreach ($unreadMessages as $msg) {
            $feed->push([
                'type'    => 'message',
                'icon'    => 'mail',
                'color'   => 'blue',
                'title'   => $msg->subject ?: 'Message sans sujet',
                'body'    => $msg->name . ' · ' . $msg->email,
                'time'    => $msg->created_at,
                'url'     => route('admin.contacts.show', $msg),
                'badge'   => 'Non lu',
                'badgeColor' => 'blue',
                'read'    => false,
            ]);
        }

        foreach ($pendingOrders as $order) {
            $feed->push([
                'type'    => 'order',
                'icon'    => 'cart',
                'color'   => 'amber',
                'title'   => 'Commande ' . $order->reference,
                'body'    => $order->customer_name . ' · ' . number_format($order->total, 0, ',', ' ') . ' FCFA',
                'time'    => $order->created_at,
                'url'     => route('admin.orders.show', $order),
                'badge'   => 'En attente',
                'badgeColor' => 'amber',
                'read'    => false,
            ]);
        }

        foreach ($recentOrders as $order) {
            $label = $order->status === 'confirmed' ? 'Confirmée' : 'En traitement';
            $color = $order->status === 'confirmed' ? 'green' : 'violet';
            $feed->push([
                'type'    => 'order',
                'icon'    => 'cart',
                'color'   => $color,
                'title'   => 'Commande ' . $order->reference,
                'body'    => $order->customer_name . ' · ' . number_format($order->total, 0, ',', ' ') . ' FCFA',
                'time'    => $order->created_at,
                'url'     => route('admin.orders.show', $order),
                'badge'   => $label,
                'badgeColor' => $color,
                'read'    => true,
            ]);
        }

        $feed = $feed->sortByDesc('time')->values();

        $totalUnread = $unreadMessages->count() + $pendingOrders->count();

        return view('admin.notifications.index', compact('feed', 'unreadMessages', 'pendingOrders', 'totalUnread'));
    }

    public function markAllRead()
    {
        Contact::where('is_read', false)->update(['is_read' => true, 'read_at' => now()]);
        return back()->with('success', 'Tous les messages marqués comme lus.');
    }
}
