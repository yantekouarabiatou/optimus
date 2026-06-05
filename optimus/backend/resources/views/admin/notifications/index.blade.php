@extends('layouts.admin')
@section('title', 'Notifications')
@section('breadcrumb', 'Notifications')

@section('content')
<div class="space-y-6">

  {{-- ── En-tête ── --}}
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div>
      <h1 class="text-2xl font-extrabold text-foreground flex items-center gap-3">
        Notifications
        @if($totalUnread > 0)
          <span class="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-red-500 text-white text-sm font-extrabold">
            {{ $totalUnread }}
          </span>
        @endif
      </h1>
      <p class="text-muted-foreground text-sm mt-0.5">
        {{ $feed->count() }} notification(s) —
        <span class="font-medium text-foreground">{{ $unreadMessages->count() }} message(s) non lu(s)</span>,
        <span class="font-medium text-amber-600">{{ $pendingOrders->count() }} commande(s) en attente</span>
      </p>
    </div>

    <div class="flex items-center gap-3">
      @if($unreadMessages->count() > 0)
        <form method="POST" action="{{ route('admin.notifications.markAllRead') }}">
          @csrf
          <button type="submit"
                  class="flex items-center gap-2 px-5 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all shadow-sm">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Tout marquer comme lu
          </button>
        </form>
      @endif
      <a href="{{ route('admin.contacts.index') }}"
         class="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        Tous les messages
      </a>
    </div>
  </div>

  {{-- ── Résumé stats ── --}}
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-white rounded-2xl border border-border p-5 shadow-sm flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
      </div>
      <div>
        <p class="text-2xl font-extrabold text-foreground">{{ $unreadMessages->count() }}</p>
        <p class="text-sm text-muted-foreground">Messages non lus</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-border p-5 shadow-sm flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
      </div>
      <div>
        <p class="text-2xl font-extrabold text-foreground">{{ $pendingOrders->count() }}</p>
        <p class="text-sm text-muted-foreground">Commandes en attente</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-border p-5 shadow-sm flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
      </div>
      <div>
        <p class="text-2xl font-extrabold text-red-500">{{ $totalUnread }}</p>
        <p class="text-sm text-muted-foreground">Alertes actives</p>
      </div>
    </div>
    <div class="bg-white rounded-2xl border border-border p-5 shadow-sm flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
      </div>
      <div>
        <p class="text-2xl font-extrabold text-foreground">{{ $feed->count() }}</p>
        <p class="text-sm text-muted-foreground">Total dans le flux</p>
      </div>
    </div>
  </div>

  {{-- ── Flux de notifications ── --}}
  <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
    <div class="px-6 py-4 border-b border-border bg-slate-50/60 flex items-center justify-between">
      <h2 class="text-base font-bold text-foreground">Flux d'activité</h2>
      <span class="text-xs text-muted-foreground">Trié par date · du plus récent</span>
    </div>

    @if($feed->isEmpty())
      <div class="flex flex-col items-center justify-center py-20 text-center px-4">
        <div class="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
        <p class="text-base font-semibold text-foreground">Aucune notification</p>
        <p class="text-sm text-muted-foreground mt-1">Tout est à jour !</p>
      </div>
    @else
      <div class="divide-y divide-border">
        @foreach($feed as $notif)
          @php
            $colors = [
              'blue'   => ['bg' => 'bg-blue-100',   'icon' => 'text-blue-600',   'badge' => 'bg-blue-100 text-blue-700 border-blue-200'],
              'amber'  => ['bg' => 'bg-amber-100',  'icon' => 'text-amber-600',  'badge' => 'bg-amber-100 text-amber-700 border-amber-200'],
              'green'  => ['bg' => 'bg-green-100',  'icon' => 'text-green-600',  'badge' => 'bg-green-100 text-green-700 border-green-200'],
              'violet' => ['bg' => 'bg-violet-100', 'icon' => 'text-violet-600', 'badge' => 'bg-violet-100 text-violet-700 border-violet-200'],
              'red'    => ['bg' => 'bg-red-100',    'icon' => 'text-red-600',    'badge' => 'bg-red-100 text-red-700 border-red-200'],
            ];
            $c = $colors[$notif['badgeColor']] ?? $colors['blue'];
          @endphp
          <a href="{{ $notif['url'] }}"
             class="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/80 transition-colors group {{ !$notif['read'] ? 'bg-blue-50/30' : '' }}">

            {{-- Icône --}}
            <div class="w-11 h-11 rounded-xl {{ $c['bg'] }} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
              @if($notif['icon'] === 'mail')
                <svg class="w-5 h-5 {{ $c['icon'] }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              @else
                <svg class="w-5 h-5 {{ $c['icon'] }}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              @endif
            </div>

            {{-- Contenu --}}
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-3 flex-wrap">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-semibold text-foreground {{ !$notif['read'] ? 'font-bold' : '' }} truncate max-w-xs">
                    {{ $notif['title'] }}
                  </p>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border {{ $c['badge'] }}">
                    @if(!$notif['read'])<span class="w-1.5 h-1.5 rounded-full {{ str_replace('text-', 'bg-', $c['icon']) }} animate-pulse"></span>@endif
                    {{ $notif['badge'] }}
                  </span>
                </div>
                <span class="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                  {{ $notif['time']->diffForHumans() }}
                </span>
              </div>
              <p class="text-sm text-muted-foreground mt-0.5 truncate">{{ $notif['body'] }}</p>
              <p class="text-xs text-muted-foreground/60 mt-1">{{ $notif['time']->format('d/m/Y à H:i') }}</p>
            </div>

            {{-- Flèche --}}
            <svg class="w-4 h-4 text-muted-foreground/40 group-hover:text-muted-foreground shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </a>
        @endforeach
      </div>
    @endif
  </div>

</div>
@endsection
