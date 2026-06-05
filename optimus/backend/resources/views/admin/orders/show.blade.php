@extends('layouts.admin')
@section('title', 'Commande '.$order->reference)
@section('breadcrumb', 'Commande '.$order->reference)

@section('content')
@php
  $statusOptions = ['pending'=>'En attente','confirmed'=>'Confirmée','processing'=>'En traitement','delivered'=>'Livrée','cancelled'=>'Annulée'];
  $statusColors  = ['pending'=>'bg-amber-100 text-amber-700 border-amber-200','confirmed'=>'bg-blue-100 text-blue-700 border-blue-200','processing'=>'bg-violet-100 text-violet-700 border-violet-200','delivered'=>'bg-green-100 text-green-700 border-green-200','cancelled'=>'bg-red-100 text-red-700 border-red-200'];
  $dotColors     = ['pending'=>'bg-amber-400','confirmed'=>'bg-blue-500','processing'=>'bg-violet-500','delivered'=>'bg-green-500','cancelled'=>'bg-red-500'];
@endphp

<div class="max-w-2xl space-y-6">
  <div class="flex items-center gap-3">
    <a href="{{ route('admin.orders.index') }}" class="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </a>
    <div>
      <h1 class="text-2xl font-bold text-foreground">Commande</h1>
      <code class="text-sm text-muted-foreground">{{ $order->reference }}</code>
    </div>
  </div>

  {{-- Status selector --}}
  <div class="bg-white rounded-2xl border border-border p-6 shadow-sm">
    <h2 class="font-semibold text-foreground mb-4">Modifier le statut</h2>
    <form method="POST" action="{{ route('admin.orders.status', $order) }}">
      @csrf @method('PATCH')
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        @foreach($statusOptions as $value => $label)
          <label class="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all
                        {{ $order->status === $value ? $statusColors[$value].' ring-2 ring-offset-1' : 'border-border hover:border-muted-foreground/30' }}">
            <input type="radio" name="status" value="{{ $value }}" {{ $order->status === $value ? 'checked' : '' }} class="sr-only">
            <span class="w-3 h-3 rounded-full shrink-0 {{ $dotColors[$value] }}"></span>
            <span class="text-sm font-medium">{{ $label }}</span>
          </label>
        @endforeach
      </div>
      <button type="submit" class="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
        Enregistrer le statut
      </button>
    </form>
  </div>

  {{-- Customer info --}}
  <div class="bg-white rounded-2xl border border-border p-6 shadow-sm">
    <h2 class="font-semibold text-foreground mb-4">Informations client</h2>
    <dl class="space-y-2 text-sm">
      <div class="flex gap-2"><dt class="text-muted-foreground w-28 shrink-0">Nom</dt><dd class="font-medium">{{ $order->customer_name }}</dd></div>
      @if($order->customer_phone)<div class="flex gap-2"><dt class="text-muted-foreground w-28 shrink-0">Téléphone</dt><dd>{{ $order->customer_phone }}</dd></div>@endif
      @if($order->customer_email)<div class="flex gap-2"><dt class="text-muted-foreground w-28 shrink-0">Email</dt><dd>{{ $order->customer_email }}</dd></div>@endif
      @if($order->customer_address)<div class="flex gap-2"><dt class="text-muted-foreground w-28 shrink-0">Adresse</dt><dd>{{ $order->customer_address }}</dd></div>@endif
      @if($order->notes)<div class="flex gap-2"><dt class="text-muted-foreground w-28 shrink-0">Notes</dt><dd class="italic text-muted-foreground">{{ $order->notes }}</dd></div>@endif
    </dl>
  </div>

  {{-- Items --}}
  <div class="bg-white rounded-2xl border border-border p-6 shadow-sm">
    <h2 class="font-semibold text-foreground mb-4">Articles commandés</h2>
    <div class="space-y-3">
      @foreach($order->items as $item)
        <div class="flex items-center justify-between py-2 border-b border-border last:border-0">
          <div>
            <p class="font-medium text-sm">{{ $item->product_name }}</p>
            <p class="text-xs text-muted-foreground">{{ number_format($item->product_price, 0, ',', ' ') }} FCFA × {{ $item->quantity }}</p>
          </div>
          <span class="font-bold text-sm">{{ number_format($item->subtotal, 0, ',', ' ') }} FCFA</span>
        </div>
      @endforeach
    </div>
    <div class="flex justify-between items-center mt-4 pt-4 border-t border-border">
      <span class="font-semibold text-foreground">Total</span>
      <span class="text-xl font-extrabold text-accent">{{ number_format($order->total, 0, ',', ' ') }} FCFA</span>
    </div>
  </div>

  {{-- Delete --}}
  <form method="POST" action="{{ route('admin.orders.destroy', $order) }}" onsubmit="return confirm('Supprimer définitivement cette commande ?')">
    @csrf @method('DELETE')
    <button type="submit" class="w-full py-2.5 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors">
      Supprimer la commande
    </button>
  </form>
</div>
@endsection
