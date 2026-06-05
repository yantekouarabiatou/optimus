@extends('layouts.admin')
@section('title', 'Utilisateurs')
@section('breadcrumb', 'Utilisateurs')

@section('content')
<div class="space-y-6">
  <div>
    <h1 class="text-2xl font-bold text-foreground">Utilisateurs</h1>
    <p class="text-muted-foreground text-sm mt-0.5">{{ $users->count() }} utilisateur(s)</p>
  </div>

  <div class="bg-white rounded-2xl border border-border p-5 shadow-sm">
    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="w-full text-sm">
        <thead><tr class="bg-muted/60 border-b border-border">
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Utilisateur</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rôles</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Créé le</th>
          <th class="px-4 py-3"></th>
        </tr></thead>
        <tbody class="divide-y divide-border bg-card">
          @foreach($users as $user)
            <tr class="hover:bg-muted/30 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span class="text-primary text-xs font-bold">{{ strtoupper(substr($user->name, 0, 1)) }}</span>
                  </div>
                  <div>
                    <p class="font-medium text-foreground text-sm">{{ $user->name }}</p>
                    <p class="text-xs text-muted-foreground">{{ $user->email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <div class="flex flex-wrap gap-1">
                  @foreach($user->getRoleNames() as $role)
                    <span class="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">{{ $role }}</span>
                  @endforeach
                  @if($user->getRoleNames()->isEmpty())
                    <span class="text-muted-foreground text-xs">Aucun rôle</span>
                  @endif
                </div>
              </td>
              <td class="px-4 py-3 text-xs text-muted-foreground">{{ \Carbon\Carbon::parse($user->created_at)->format('d/m/Y') }}</td>
              <td class="px-4 py-3">
                @if($user->id !== Auth::id())
                  <form method="POST" action="{{ route('admin.users.destroy', $user) }}" onsubmit="return confirm('Supprimer cet utilisateur ?')">
                    @csrf @method('DELETE')
                    <button type="submit" class="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </form>
                @endif
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection
