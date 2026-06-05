@extends('layouts.admin')
@section('title', 'Commandes')
@section('breadcrumb', 'Commandes')

@section('content')
<div class="space-y-6">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-foreground">Commandes</h1>
      <p class="text-muted-foreground text-sm mt-0.5">{{ $orders->count() }} commande(s)</p>
    </div>
  </div>

  {{-- Status chips --}}
  @php
    $statusLabels = ['pending'=>'En attente','confirmed'=>'Confirmée','processing'=>'En traitement','delivered'=>'Livrée','cancelled'=>'Annulée'];
    $statusColors = ['pending'=>'bg-amber-100 text-amber-700','confirmed'=>'bg-blue-100 text-blue-700','processing'=>'bg-violet-100 text-violet-700','delivered'=>'bg-green-100 text-green-700','cancelled'=>'bg-red-100 text-red-700'];
  @endphp
  <div class="flex flex-wrap gap-2">
    @foreach($statusLabels as $value => $label)
      @php $count = $orders->where('status', $value)->count(); @endphp
      @if($count > 0)
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium {{ $statusColors[$value] }}">
          {{ $label }} <span class="font-bold">({{ $count }})</span>
        </span>
      @endif
    @endforeach
  </div>

  <div class="bg-white rounded-2xl border border-border p-5 shadow-sm"
       x-data="{ search: '' }">
    <div class="mb-4">
      <div class="relative max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input x-model="search" type="search" placeholder="Rechercher une commande..."
               class="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
      </div>
    </div>
    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="w-full text-sm">
        <thead><tr class="bg-muted/60 border-b border-border">
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Référence</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Montant</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
          <th class="px-4 py-3"></th>
        </tr></thead>
        <tbody class="divide-y divide-border bg-card">
          @foreach($orders as $order)
            <tr class="hover:bg-muted/30 transition-colors"
                x-show="!search || '{{ strtolower($order->reference . ' ' . $order->customer_name) }}'.includes(search.toLowerCase())">
              <td class="px-4 py-3"><span class="font-mono text-xs bg-muted px-2 py-1 rounded">{{ $order->reference }}</span></td>
              <td class="px-4 py-3">
                <p class="font-medium text-sm">{{ $order->customer_name }}</p>
                @if($order->customer_phone)<p class="text-xs text-muted-foreground">{{ $order->customer_phone }}</p>@endif
              </td>
              <td class="px-4 py-3 font-semibold tabular-nums">{{ number_format($order->total, 0, ',', ' ') }} FCFA</td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium {{ $statusColors[$order->status] ?? 'bg-muted text-muted-foreground' }}">
                  {{ $statusLabels[$order->status] ?? $order->status }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-muted-foreground">{{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <a href="{{ route('admin.orders.show', $order) }}" class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Voir le détail">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  </a>
                  <form method="POST" action="{{ route('admin.orders.destroy', $order) }}" onsubmit="return confirm('Supprimer cette commande ?')">
                    @csrf @method('DELETE')
                    <button type="submit" class="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection
