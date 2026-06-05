<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Admin') | Optimus+ Solutions</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="/logo.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  {{-- Select2 --}}
  <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet">
  <style>
    .select2-container .select2-selection--single { height: 46px !important; border: 1px solid hsl(var(--input, 214.3 31.8% 91.4%)) !important; border-radius: 0.75rem !important; background: white !important; }
    .select2-container--default .select2-selection--single .select2-selection__rendered { line-height: 46px !important; padding-left: 1rem !important; padding-right: 2.5rem !important; color: inherit !important; font-size: 0.875rem !important; }
    .select2-container--default .select2-selection--single .select2-selection__arrow { height: 46px !important; right: 10px !important; }
    .select2-container--default .select2-results__option--highlighted { background-color: #0D2B6E !important; }
    .select2-dropdown { border: 1px solid #e2e8f0 !important; border-radius: 0.75rem !important; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1) !important; margin-top: 4px; }
    .select2-container--default.select2-container--focus .select2-selection--single { border-color: #0D2B6E !important; outline: none !important; box-shadow: 0 0 0 3px rgba(13,43,110,0.15) !important; }
    .select2-search--dropdown .select2-search__field { border-radius: 0.5rem !important; border: 1px solid #e2e8f0 !important; padding: 0.4rem 0.75rem !important; font-size: 0.875rem !important; }
    .select2-results__option { padding: 0.5rem 1rem !important; font-size: 0.875rem !important; }
  </style>
  @stack('head')
</head>
<body class="font-sans antialiased bg-slate-50"
  x-data="{
    sidebarOpen: false,
    pendingOrders: {{ $pendingOrders ?? 0 }},
    unreadMessages: {{ $unreadMessages ?? 0 }},
    get totalNotifs() { return this.pendingOrders + this.unreadMessages }
  }"
>
<div class="flex h-screen overflow-hidden">

  {{-- ── Mobile overlay ── --}}
  <div x-show="sidebarOpen" x-cloak @click="sidebarOpen=false"
       class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
       x-transition:enter="transition-opacity duration-200"
       x-transition:enter-start="opacity-0"
       x-transition:leave="transition-opacity duration-150"
       x-transition:leave-end="opacity-0"></div>

  {{-- ── Sidebar ── --}}
  <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-[#0D2B6E] flex flex-col
                 translate-x-0 lg:relative lg:translate-x-0 transition-transform duration-300"
         :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'">

    {{-- Logo --}}
    <div class="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
      <img src="/logo.jpg" alt="Optimus+" class="w-9 h-9 rounded-lg shrink-0 object-cover">
      <div class="min-w-0">
        <div class="font-bold text-white text-sm leading-none">OPTIMUS+</div>
        <div class="text-white/50 text-[10px] tracking-wider mt-0.5">Administration</div>
      </div>
      <button @click="sidebarOpen=false" class="ml-auto text-white/60 hover:text-white lg:hidden">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    {{-- Nav --}}
    <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-5">
      @php
        $navGroups = [
          ['label'=>'Principal','items'=>[
            ['href'=>route('admin.dashboard'),'label'=>'Tableau de bord','icon'=>'grid','badge'=>null,'match'=>'admin.dashboard'],
          ]],
          ['label'=>'Catalogue','items'=>[
            ['href'=>route('admin.products.index'),'label'=>'Produits','icon'=>'package','badge'=>null,'match'=>'admin.products.*'],
            ['href'=>route('admin.categories.index'),'label'=>'Catégories','icon'=>'tag','badge'=>null,'match'=>'admin.categories.*'],
          ]],
          ['label'=>'Commerce','items'=>[
            ['href'=>route('admin.orders.index'),'label'=>'Commandes','icon'=>'cart','badge'=>'pendingOrders','match'=>'admin.orders.*'],
            ['href'=>route('admin.contacts.index'),'label'=>'Messages','icon'=>'mail','badge'=>'unreadMessages','match'=>'admin.contacts.*'],
            ['href'=>route('admin.notifications.index'),'label'=>'Notifications','icon'=>'bell','badge'=>'totalNotifs','match'=>'admin.notifications.*'],
          ]],
          ['label'=>'Administration','items'=>[
            ['href'=>route('admin.users.index'),'label'=>'Utilisateurs','icon'=>'users','badge'=>null,'match'=>'admin.users.*'],
          ]],
        ];
        $icons = [
          'grid'    => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>',
          'package' => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
          'tag'     => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"/></svg>',
          'cart'    => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
          'mail'    => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
          'users'   => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
          'bell'    => '<svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
        ];
      @endphp

      @foreach($navGroups as $group)
        <div>
          <p class="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-3 mb-1.5">{{ $group['label'] }}</p>
          <div class="space-y-0.5">
            @foreach($group['items'] as $item)
              @php $active = request()->routeIs($item['match']); @endphp
              <a href="{{ $item['href'] }}"
                 @click="sidebarOpen=false"
                 class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all
                        {{ $active ? 'bg-white/15 text-white shadow-sm' : 'text-white/65 hover:bg-white/8 hover:text-white/90' }}">
                {!! $icons[$item['icon']] !!}
                <span class="flex-1">{{ $item['label'] }}</span>
                @if($item['badge'])
                  <span x-show="{{ $item['badge'] }} > 0" x-text="{{ $item['badge'] }}"
                        class="min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full bg-red-500 text-white leading-none flex items-center justify-center"></span>
                @endif
              </a>
            @endforeach
          </div>
        </div>
      @endforeach
    </nav>

    {{-- User --}}
    <div class="px-3 py-4 border-t border-white/10 shrink-0 space-y-1">
      <a href="{{ route('admin.profile') }}" @click="sidebarOpen=false"
         class="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
        <div class="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
          <span class="text-accent text-xs font-bold">{{ strtoupper(substr(Auth::user()->name ?? 'A', 0, 1)) }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-white text-xs font-medium truncate">{{ Auth::user()->name ?? 'Admin' }}</p>
          <p class="text-white/40 text-[10px] truncate">{{ Auth::user()->email ?? '' }}</p>
        </div>
      </a>
      <form method="POST" action="{{ route('admin.logout') }}">
        @csrf
        <button type="submit"
          class="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Déconnexion
        </button>
      </form>
    </div>
  </aside>

  {{-- ── Main ── --}}
  <div class="flex-1 flex flex-col overflow-hidden">
    {{-- Topbar --}}
    <header class="h-14 bg-white border-b border-slate-200 flex items-center px-4 gap-3 shrink-0 shadow-sm">
      <button @click="sidebarOpen=true" class="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div class="flex items-center gap-1.5 text-sm flex-1">
        <span class="text-muted-foreground">Admin</span>
        @hasSection('breadcrumb')
          <svg class="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          <span class="font-medium text-foreground">@yield('breadcrumb')</span>
        @endif
      </div>
      <div class="flex items-center gap-2">
        <a href="{{ route('admin.notifications.index') }}"
           class="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
          <span x-show="totalNotifs > 0" x-text="totalNotifs > 99 ? '99+' : totalNotifs"
                class="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-red-500 text-white leading-none"></span>
        </a>
        <a href="/" target="_blank" class="hidden sm:flex items-center gap-1.5 h-8 px-3 text-xs font-medium border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
          Voir le site
        </a>
      </div>
    </header>

    {{-- Content --}}
    <main class="flex-1 overflow-y-auto p-5 lg:p-7">
      @if(session('success'))
        <div x-data="{show:true}" x-show="show" x-init="setTimeout(()=>show=false,4000)"
             class="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ session('success') }}
        </div>
      @endif
      @if(session('error'))
        <div x-data="{show:true}" x-show="show" x-init="setTimeout(()=>show=false,4000)"
             class="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
          <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ session('error') }}
        </div>
      @endif
      @yield('content')
    </main>
  </div>
</div>
  {{-- jQuery + Select2 --}}
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
  <script>
    $(document).ready(function () {
      $('select.select2').select2({ width: '100%', placeholder: $(this).data('placeholder') || 'Sélectionner…', allowClear: true });
    });
  </script>
  @stack('scripts')
</body>
</html>
