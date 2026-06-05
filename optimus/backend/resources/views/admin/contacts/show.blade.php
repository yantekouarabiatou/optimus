@extends('layouts.admin')
@section('title', 'Message de '.$contact->name)
@section('breadcrumb', 'Message')

@section('content')
<div class="space-y-6">

  {{-- ── En-tête ── --}}
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div class="flex items-center gap-3">
      <a href="{{ route('admin.contacts.index') }}"
         class="p-2 rounded-xl hover:bg-white border border-transparent hover:border-border text-muted-foreground hover:text-foreground transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </a>
      <div>
        <h1 class="text-2xl font-extrabold text-foreground">Message de {{ $contact->name }}</h1>
        <p class="text-sm text-muted-foreground mt-0.5">
          Reçu le {{ $contact->created_at->format('d/m/Y à H:i') }}
        </p>
      </div>
    </div>

    {{-- Navigation prev / next --}}
    <div class="flex items-center gap-2">
      @if($prev)
        <a href="{{ route('admin.contacts.show', $prev) }}"
           class="flex items-center gap-1.5 px-3 py-2 bg-white border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          Précédent
        </a>
      @endif
      @if($next)
        <a href="{{ route('admin.contacts.show', $next) }}"
           class="flex items-center gap-1.5 px-3 py-2 bg-white border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-all">
          Suivant
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </a>
      @endif
    </div>
  </div>

  <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">

    {{-- ── Infos expéditeur ── --}}
    <div class="space-y-5">

      {{-- Carte expéditeur --}}
      <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-border bg-slate-50/60">
          <h2 class="text-base font-bold text-foreground flex items-center gap-2">
            <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            Expéditeur
          </h2>
        </div>
        <div class="p-6">
          {{-- Avatar --}}
          <div class="flex items-center gap-4 mb-5">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <span class="text-primary text-xl font-extrabold">{{ strtoupper(substr($contact->name, 0, 1)) }}</span>
            </div>
            <div>
              <p class="font-bold text-foreground text-base">{{ $contact->name }}</p>
              <p class="text-sm text-muted-foreground break-all">{{ $contact->email }}</p>
            </div>
          </div>
          <div class="space-y-3 text-sm">
            <div class="flex items-start gap-3">
              <svg class="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <div>
                <p class="text-xs text-muted-foreground">Date de réception</p>
                <p class="font-medium text-foreground">{{ $contact->created_at->format('d/m/Y') }}</p>
                <p class="text-xs text-muted-foreground">{{ $contact->created_at->format('H:i') }} ({{ $contact->created_at->diffForHumans() }})</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <svg class="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <div>
                <p class="text-xs text-muted-foreground">Statut</p>
                @if($contact->is_read)
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span> Lu
                  </span>
                  @if($contact->read_at)
                    <p class="text-xs text-muted-foreground mt-0.5">le {{ \Carbon\Carbon::parse($contact->read_at)->format('d/m/Y à H:i') }}</p>
                  @endif
                @else
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Non lu
                  </span>
                @endif
              </div>
            </div>
          </div>
        </div>
      </div>

      {{-- Actions --}}
      <div class="bg-white rounded-2xl border border-border shadow-sm p-5 space-y-3">
        <h2 class="text-sm font-bold text-foreground mb-3">Actions</h2>

        <a href="mailto:{{ $contact->email }}?subject=Re: {{ rawurlencode($contact->subject) }}"
           class="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm shadow-primary/20">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
          Répondre par email
        </a>

        @if(!$contact->is_read)
          <form method="POST" action="{{ route('admin.contacts.read', $contact) }}">
            @csrf @method('PATCH')
            <button type="submit"
                    class="w-full flex items-center justify-center gap-2 py-2.5 border border-border text-foreground font-semibold text-sm rounded-xl hover:bg-muted transition-all">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
              Marquer comme lu
            </button>
          </form>
        @endif

        <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}"
              onsubmit="return confirm('Supprimer définitivement ce message ?')">
          @csrf @method('DELETE')
          <button type="submit"
                  class="w-full flex items-center justify-center gap-2 py-2.5 border border-red-200 text-red-600 font-semibold text-sm rounded-xl hover:bg-red-50 transition-all">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            Supprimer le message
          </button>
        </form>
      </div>

    </div>

    {{-- ── Corps du message ── --}}
    <div class="xl:col-span-2">
      <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden h-full">

        {{-- Header du message --}}
        <div class="px-7 py-5 border-b border-border bg-slate-50/60">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-xl font-extrabold text-foreground">{{ $contact->subject ?: '(Sans sujet)' }}</h2>
              <div class="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                <span class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  {{ $contact->name }}
                </span>
                <span class="text-border">·</span>
                <span class="flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  {{ $contact->email }}
                </span>
                <span class="text-border">·</span>
                <span>{{ $contact->created_at->diffForHumans() }}</span>
              </div>
            </div>
            @if(!$contact->is_read)
              <span class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                Non lu
              </span>
            @else
              <span class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                Lu
              </span>
            @endif
          </div>
        </div>

        {{-- Corps --}}
        <div class="p-7">
          <div class="prose prose-sm max-w-none text-foreground text-base leading-relaxed whitespace-pre-line bg-slate-50/50 rounded-2xl border border-slate-100 p-6 min-h-[200px]">{{ $contact->message }}</div>
        </div>

        {{-- Pied --}}
        <div class="px-7 pb-6">
          <a href="mailto:{{ $contact->email }}?subject=Re: {{ rawurlencode($contact->subject) }}"
             class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
            Répondre à {{ $contact->name }}
          </a>
        </div>
      </div>
    </div>

  </div>
</div>
@endsection
