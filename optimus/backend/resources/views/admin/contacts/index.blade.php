@extends('layouts.admin')
@section('title', 'Messages')
@section('breadcrumb', 'Messages')

@section('content')
<div class="space-y-6" x-data="{ search: '' }">
  <div class="flex items-center justify-between gap-4 flex-wrap">
    <div>
      <h1 class="text-2xl font-extrabold text-foreground">Messages</h1>
      <p class="text-muted-foreground text-sm mt-0.5">
        {{ $contacts->count() }} message(s) ·
        <span class="font-medium text-blue-600">{{ $contacts->where('is_read', false)->count() }} non lu(s)</span>
      </p>
    </div>
    <a href="{{ route('admin.notifications.index') }}"
       class="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-all shadow-sm">
      <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
      Notifications
    </a>
  </div>

  <div class="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
    <div class="px-5 py-4 border-b border-border">
      <div class="relative max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input x-model="search" type="search" placeholder="Rechercher un message..."
               class="w-full pl-9 pr-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-slate-50/80 border-b border-border">
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-6"></th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Expéditeur</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sujet</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
            <th class="px-5 py-3.5"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          @forelse($contacts as $contact)
            <tr class="hover:bg-slate-50/60 transition-colors {{ !$contact->is_read ? 'bg-blue-50/20' : '' }}"
                x-show="!search || '{{ strtolower($contact->name . ' ' . $contact->email . ' ' . $contact->subject) }}'.includes(search.toLowerCase())">

              {{-- Indicateur non lu --}}
              <td class="px-5 py-4">
                @if(!$contact->is_read)
                  <span class="w-2.5 h-2.5 rounded-full bg-blue-500 block animate-pulse"></span>
                @endif
              </td>

              {{-- Expéditeur --}}
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span class="text-primary text-sm font-bold">{{ strtoupper(substr($contact->name, 0, 1)) }}</span>
                  </div>
                  <div>
                    <p class="{{ !$contact->is_read ? 'font-bold' : 'font-medium' }} text-foreground text-sm">{{ $contact->name }}</p>
                    <p class="text-xs text-muted-foreground">{{ $contact->email }}</p>
                  </div>
                </div>
              </td>

              {{-- Sujet --}}
              <td class="px-5 py-4">
                <p class="{{ !$contact->is_read ? 'font-semibold text-foreground' : 'text-muted-foreground' }} text-sm">
                  {{ Str::limit($contact->subject ?: '(Sans sujet)', 55) }}
                </p>
              </td>

              {{-- Date --}}
              <td class="px-5 py-4">
                <p class="text-sm text-muted-foreground">{{ $contact->created_at->format('d/m/Y') }}</p>
                <p class="text-xs text-muted-foreground/60">{{ $contact->created_at->format('H:i') }}</p>
              </td>

              {{-- Statut --}}
              <td class="px-5 py-4">
                @if(!$contact->is_read)
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                    <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                    Non lu
                  </span>
                @else
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
                    Lu
                  </span>
                @endif
              </td>

              {{-- Actions --}}
              <td class="px-5 py-4">
                <div class="flex items-center gap-2 justify-end">
                  <a href="{{ route('admin.contacts.show', $contact) }}"
                     class="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-all">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    Voir
                  </a>
                  <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}"
                        onsubmit="return confirm('Supprimer ce message ?')">
                    @csrf @method('DELETE')
                    <button type="submit" class="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          @empty
            <tr>
              <td colspan="6" class="px-5 py-16 text-center">
                <div class="flex flex-col items-center gap-3 text-muted-foreground">
                  <div class="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <svg class="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <p class="text-base font-semibold text-foreground">Aucun message reçu</p>
                  <p class="text-sm">Les messages du formulaire de contact apparaîtront ici.</p>
                </div>
              </td>
            </tr>
          @endforelse
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection
