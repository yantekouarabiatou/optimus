@extends('layouts.admin')
@section('title', 'Tableau de bord')
@section('breadcrumb', 'Tableau de bord')

@section('content')
<div class="space-y-8">

  {{-- ── En-tête ── --}}
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-extrabold text-foreground">Tableau de bord</h1>
      <p class="text-muted-foreground text-base mt-1">Bienvenue, <span class="font-semibold text-foreground">{{ Auth::user()->name }}</span> — {{ now()->locale('fr')->isoFormat('dddd D MMMM YYYY') }}</p>
    </div>
    <a href="{{ route('admin.orders.index') }}"
       class="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
      Voir les commandes
    </a>
  </div>

  {{-- ── Cartes statistiques ── --}}
  @php
    $stats = [
      ['Commandes totales', $data['orders']['total'],   'En attente : '.$data['orders']['pending'],   '#f59e0b', 'bg-amber-50',  'text-amber-600',  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>'],
      ['Produits actifs',   $data['products']['active'], 'Stock faible : '.$data['products']['low_stock'], '#3b82f6', 'bg-blue-50',   'text-blue-600',   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>'],
      ['Messages reçus',    $data['messages']['total'],  'Non lus : '.$data['messages']['unread'],      '#8b5cf6', 'bg-violet-50', 'text-violet-600', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>'],
      ['Revenus générés',   number_format($data['orders']['revenue'], 0, ',', ' ').' FCFA', 'Commandes livrées : '.$data['orders']['delivered'], '#10b981', 'bg-emerald-50', 'text-emerald-600', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v1m0-10a9 9 0 110 18 9 9 0 010-18z"/>'],
    ];
  @endphp
  <div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
    @foreach($stats as [$label, $value, $sub, $color, $bg, $text, $path])
      <div class="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between mb-4">
          <p class="text-sm font-medium text-muted-foreground">{{ $label }}</p>
          <div class="w-11 h-11 rounded-xl {{ $bg }} flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 {{ $text }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">{!! $path !!}</svg>
          </div>
        </div>
        <div class="text-3xl font-extrabold text-foreground leading-none mb-2">{{ $value }}</div>
        <p class="text-sm text-muted-foreground">{{ $sub }}</p>
      </div>
    @endforeach
  </div>

  {{-- ── Statuts des commandes + Revenus ── --}}
  <div class="grid lg:grid-cols-3 gap-5">

    {{-- Répartition des statuts --}}
    <div class="lg:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-foreground">Répartition des commandes</h2>
          <p class="text-sm text-muted-foreground mt-0.5">Détail par statut</p>
        </div>
        <span class="text-2xl font-extrabold text-foreground">{{ $data['orders']['total'] }}</span>
      </div>

      @php
        $statuses = [
          ['En attente',    $data['orders']['pending'],    'bg-amber-500',  'text-amber-700',  'bg-amber-50'],
          ['Confirmée',     $data['orders']['confirmed'],  'bg-blue-500',   'text-blue-700',   'bg-blue-50'],
          ['En traitement', $data['orders']['processing'], 'bg-violet-500', 'text-violet-700', 'bg-violet-50'],
          ['Livrée',        $data['orders']['delivered'],  'bg-emerald-500','text-emerald-700','bg-emerald-50'],
          ['Annulée',       $data['orders']['cancelled'],  'bg-red-500',    'text-red-700',    'bg-red-50'],
        ];
        $total = max($data['orders']['total'], 1);
      @endphp

      <div class="space-y-4">
        @foreach($statuses as [$label, $count, $bar, $textColor, $bgBadge])
          @php $pct = round($count / $total * 100); @endphp
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full {{ $bar }} shrink-0"></span>
                <span class="text-sm font-medium text-foreground">{{ $label }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-sm text-muted-foreground">{{ $pct }}%</span>
                <span class="min-w-[2rem] text-right text-base font-bold {{ $textColor }}">{{ $count }}</span>
              </div>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="{{ $bar }} h-2.5 rounded-full transition-all duration-700"
                   style="width: {{ $pct }}%"></div>
            </div>
          </div>
        @endforeach
      </div>
    </div>

    {{-- Résumé financier --}}
    <div class="bg-gradient-to-br from-[#0D2B6E] to-[#1a3d8f] rounded-2xl p-6 shadow-sm text-white flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 10v1m0-10a9 9 0 110 18 9 9 0 010-18z"/></svg>
        </div>
        <p class="text-white/60 text-sm font-medium mb-2">Revenus totaux</p>
        <p class="text-3xl font-extrabold leading-tight">{{ number_format($data['orders']['revenue'], 0, ',', ' ') }}</p>
        <p class="text-accent font-semibold text-lg">FCFA</p>
      </div>
      <div class="mt-6 space-y-3 border-t border-white/10 pt-5">
        <div class="flex justify-between items-center">
          <span class="text-white/60 text-sm">Livrées</span>
          <span class="text-white font-bold text-base">{{ $data['orders']['delivered'] }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-white/60 text-sm">En cours</span>
          <span class="text-white font-bold text-base">{{ $data['orders']['processing'] + $data['orders']['confirmed'] }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-white/60 text-sm">Annulées</span>
          <span class="text-red-400 font-bold text-base">{{ $data['orders']['cancelled'] }}</span>
        </div>
      </div>
    </div>
  </div>

  {{-- ── Commandes récentes ── --}}
  <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
    <div class="flex items-center justify-between px-6 py-5 border-b border-border">
      <div>
        <h2 class="text-lg font-bold text-foreground">Commandes récentes</h2>
        <p class="text-sm text-muted-foreground mt-0.5">Les 5 dernières commandes enregistrées</p>
      </div>
      <a href="{{ route('admin.orders.index') }}" class="text-sm font-medium text-accent hover:underline">Voir tout →</a>
    </div>

    @if($data['recent_orders']->isEmpty())
      <div class="py-16 text-center">
        <svg class="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <p class="text-muted-foreground text-base">Aucune commande pour le moment</p>
      </div>
    @else
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border bg-slate-50/60">
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Référence</th>
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Articles</th>
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
              <th class="py-3.5 px-6 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
              <th class="py-3.5 px-6"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            @foreach($data['recent_orders'] as $order)
              @php
                $sc = ['pending'=>'bg-amber-100 text-amber-700 border-amber-200','confirmed'=>'bg-blue-100 text-blue-700 border-blue-200','processing'=>'bg-violet-100 text-violet-700 border-violet-200','delivered'=>'bg-emerald-100 text-emerald-700 border-emerald-200','cancelled'=>'bg-red-100 text-red-700 border-red-200'][$order->status] ?? 'bg-muted text-muted-foreground border-border';
                $sl = ['pending'=>'En attente','confirmed'=>'Confirmée','processing'=>'En traitement','delivered'=>'Livrée','cancelled'=>'Annulée'];
              @endphp
              <tr class="hover:bg-slate-50/70 transition-colors">
                <td class="py-4 px-6">
                  <span class="font-mono text-sm bg-muted px-2.5 py-1 rounded-lg border border-border">{{ $order->reference }}</span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center gap-2.5">
                    <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span class="text-primary text-xs font-bold">{{ strtoupper(substr($order->customer_name, 0, 1)) }}</span>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-foreground">{{ $order->customer_name }}</p>
                      @if($order->customer_phone)
                        <p class="text-xs text-muted-foreground">{{ $order->customer_phone }}</p>
                      @endif
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="text-sm font-medium text-foreground">{{ $order->items->count() }} article(s)</span>
                  <p class="text-xs text-muted-foreground mt-0.5">{{ $order->items->sum('quantity') }} unité(s)</p>
                </td>
                <td class="py-4 px-6">
                  <span class="text-base font-bold text-foreground">{{ number_format($order->total, 0, ',', ' ') }}</span>
                  <span class="text-xs text-muted-foreground ml-1">FCFA</span>
                </td>
                <td class="py-4 px-6">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border {{ $sc }}">
                    {{ $sl[$order->status] ?? $order->status }}
                  </span>
                </td>
                <td class="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">
                  {{ \Carbon\Carbon::parse($order->created_at)->format('d/m/Y') }}<br>
                  <span class="text-xs">{{ \Carbon\Carbon::parse($order->created_at)->format('H:i') }}</span>
                </td>
                <td class="py-4 px-6">
                  <a href="{{ route('admin.orders.show', $order) }}"
                     class="text-xs font-medium text-accent hover:underline whitespace-nowrap">Détails →</a>
                </td>
              </tr>
            @endforeach
          </tbody>
        </table>
      </div>
    @endif
  </div>

  {{-- ── Raccourcis rapides ── --}}
  <div class="grid sm:grid-cols-3 gap-4">
    @foreach([
      [route('admin.products.create'), 'Ajouter un produit', 'Nouveau produit dans le catalogue', '#3b82f6', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>'],
      [route('admin.contacts.index'), 'Voir les messages', $data['messages']['unread'].' message(s) non lu(s)', '#8b5cf6', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>'],
      [route('admin.orders.index'), 'Commandes en attente', $data['orders']['pending'].' à traiter', '#f59e0b', '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>'],
    ] as [$href, $title, $sub, $color, $icon])
      <a href="{{ $href }}"
         class="group flex items-center gap-4 bg-white rounded-2xl border border-border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
             style="background:{{ $color }}18">
          <svg class="w-5 h-5" style="color:{{ $color }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">{!! $icon !!}</svg>
        </div>
        <div class="min-w-0">
          <p class="font-semibold text-foreground text-sm group-hover:text-accent transition-colors">{{ $title }}</p>
          <p class="text-xs text-muted-foreground mt-0.5 truncate">{{ $sub }}</p>
        </div>
        <svg class="w-4 h-4 text-muted-foreground ml-auto shrink-0 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </a>
    @endforeach
  </div>

</div>
@endsection
