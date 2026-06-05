@extends('layouts.admin')
@section('title', 'Mon profil')
@section('breadcrumb', 'Mon profil')

@section('content')
<div class="space-y-7">

  {{-- ── Bannière profil ── --}}
  <div class="relative rounded-3xl overflow-hidden shadow-xl">
    <div class="h-36 bg-gradient-to-r from-[#0D2B6E] via-[#1a3d8f] to-[#0D2B6E]">
      <div class="absolute inset-0 opacity-10"
           style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                  radial-gradient(circle at 80% 20%, white 1px, transparent 1px);
                  background-size: 40px 40px;"></div>
    </div>
    <div class="bg-white px-8 pb-6">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-10">
        <div class="flex items-end gap-5">
          <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#0D2B6E] to-[#1a3d8f] border-4 border-white shadow-xl flex items-center justify-center shrink-0">
            <span class="text-white text-4xl font-extrabold">{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}</span>
          </div>
          <div class="pb-1">
            <h1 class="text-2xl font-extrabold text-foreground">{{ Auth::user()->name }}</h1>
            <p class="text-muted-foreground text-base mt-0.5">{{ Auth::user()->email }}</p>
            <span class="inline-flex items-center gap-1.5 mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              Administrateur
            </span>
          </div>
        </div>
        <div class="flex gap-4 pb-2">
          <div class="text-center px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div class="text-xl font-extrabold text-primary">{{ Auth::user()->created_at ? Auth::user()->created_at->format('Y') : '—' }}</div>
            <div class="text-xs text-muted-foreground mt-0.5">Membre depuis</div>
          </div>
          <div class="text-center px-5 py-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div class="text-xl font-extrabold text-green-600">Actif</div>
            <div class="text-xs text-muted-foreground mt-0.5">Statut du compte</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {{-- ── Informations générales (pleine largeur) ── --}}
  <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
    <div class="px-7 py-5 border-b border-border bg-slate-50/60 flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          Informations générales
        </h2>
        <p class="text-sm text-muted-foreground mt-0.5">Modifiez votre nom d'affichage dans l'interface d'administration.</p>
      </div>
    </div>
    <form method="POST" action="{{ route('admin.profile.update') }}" class="p-7">
      @csrf @method('PUT')
      <input type="hidden" name="section" value="name">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div class="md:col-span-2">
          <label class="block text-base font-semibold text-foreground mb-2">Nom complet</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            <input name="name" type="text" value="{{ old('name', Auth::user()->name) }}" required
                   class="w-full pl-11 pr-4 py-3.5 border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all @error('name') border-red-400 @enderror"
                   placeholder="Votre nom complet">
          </div>
          @error('name')<p class="text-red-500 text-sm mt-1.5">{{ $message }}</p>@enderror
        </div>

        <div class="md:col-span-2">
          <label class="block text-base font-semibold text-foreground mb-2">Adresse email</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <input type="email" value="{{ Auth::user()->email }}" disabled
                   class="w-full pl-11 pr-4 py-3.5 border border-input rounded-xl text-base bg-muted/40 text-muted-foreground cursor-not-allowed">
          </div>
          <p class="text-sm text-muted-foreground mt-1.5 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            L'adresse email ne peut pas être modifiée.
          </p>
        </div>

        <div class="md:col-span-2">
          <label class="block text-base font-semibold text-foreground mb-2">Rôle</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <input type="text" value="Administrateur" disabled
                   class="w-full pl-11 pr-4 py-3.5 border border-input rounded-xl text-base bg-muted/40 text-muted-foreground cursor-not-allowed">
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-base font-semibold text-foreground mb-2">Membre depuis</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            <input type="text" value="{{ Auth::user()->created_at ? Auth::user()->created_at->format('d/m/Y') : '—' }}" disabled
                   class="w-full pl-11 pr-4 py-3.5 border border-input rounded-xl text-base bg-muted/40 text-muted-foreground cursor-not-allowed">
          </div>
        </div>
      </div>

      <div class="mt-7 pt-5 border-t border-border flex items-center justify-end">
        <button type="submit"
                class="flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          Enregistrer les modifications
        </button>
      </div>
    </form>
  </div>

  {{-- ── Changer le mot de passe (pleine largeur) ── --}}
  <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
       x-data="{ showCurrent: false, showNew: false, showConfirm: false }">
    <div class="px-7 py-5 border-b border-border bg-slate-50/60">
      <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        Changer le mot de passe
      </h2>
      <p class="text-sm text-muted-foreground mt-0.5">Utilisez un mot de passe fort d'au moins 8 caractères.</p>
    </div>
    <form method="POST" action="{{ route('admin.profile.update') }}" class="p-7">
      @csrf @method('PUT')
      <input type="hidden" name="section" value="password">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {{-- Mot de passe actuel --}}
        <div>
          <label class="block text-base font-semibold text-foreground mb-2">Mot de passe actuel</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
            <input name="current_password" :type="showCurrent ? 'text' : 'password'" required autocomplete="current-password"
                   class="w-full pl-11 pr-12 py-3.5 border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all @error('current_password') border-red-400 @enderror"
                   placeholder="••••••••">
            <button type="button" @click="showCurrent = !showCurrent"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              <svg x-show="!showCurrent" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <svg x-show="showCurrent" x-cloak class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
            </button>
          </div>
          @error('current_password')<p class="text-red-500 text-sm mt-1.5">{{ $message }}</p>@enderror
        </div>

        {{-- Nouveau mot de passe --}}
        <div>
          <label class="block text-base font-semibold text-foreground mb-2">Nouveau mot de passe</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <input name="password" :type="showNew ? 'text' : 'password'" required autocomplete="new-password"
                   class="w-full pl-11 pr-12 py-3.5 border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all @error('password') border-red-400 @enderror"
                   placeholder="••••••••">
            <button type="button" @click="showNew = !showNew"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              <svg x-show="!showNew" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <svg x-show="showNew" x-cloak class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
            </button>
          </div>
          @error('password')<p class="text-red-500 text-sm mt-1.5">{{ $message }}</p>@enderror
        </div>

        {{-- Confirmer --}}
        <div>
          <label class="block text-base font-semibold text-foreground mb-2">Confirmer le mot de passe</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <input name="password_confirmation" :type="showConfirm ? 'text' : 'password'" required autocomplete="new-password"
                   class="w-full pl-11 pr-12 py-3.5 border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all"
                   placeholder="••••••••">
            <button type="button" @click="showConfirm = !showConfirm"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              <svg x-show="!showConfirm" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <svg x-show="showConfirm" x-cloak class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
            </button>
          </div>
        </div>
      </div>

      {{-- Règles --}}
      <div class="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p class="text-sm font-semibold text-slate-600 mb-2">Exigences du mot de passe :</p>
        <ul class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>Au moins 8 caractères</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>Une lettre majuscule</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>Un chiffre</li>
          <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>Un caractère spécial</li>
        </ul>
      </div>

      <div class="mt-7 pt-5 border-t border-border flex items-center justify-end">
        <button type="submit"
                class="flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold text-base rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Mettre à jour le mot de passe
        </button>
      </div>
    </form>
  </div>

</div>
@endsection
