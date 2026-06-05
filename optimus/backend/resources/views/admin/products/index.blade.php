@extends('layouts.admin')
@section('title', 'Produits')
@section('breadcrumb', 'Produits')

@section('content')
<div class="space-y-6" x-data="{ search: '' }">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-foreground">Produits</h1>
      <p class="text-muted-foreground text-sm mt-0.5">{{ $products->count() }} produit(s)</p>
    </div>
    <a href="{{ route('admin.products.create') }}"
       class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-sm rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      Nouveau produit
    </a>
  </div>

  <div class="bg-white rounded-2xl border border-border p-5 shadow-sm">
    <div class="mb-4">
      <div class="relative max-w-xs">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input x-model="search" type="search" placeholder="Rechercher un produit..."
               class="w-full pl-9 pr-4 py-2 bg-muted/40 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
      </div>
    </div>
    <div class="overflow-x-auto rounded-xl border border-border">
      <table class="w-full text-sm">
        <thead><tr class="bg-muted/60 border-b border-border">
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produit</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Catégorie</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prix</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
          <th class="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Statut</th>
          <th class="px-4 py-3"></th>
        </tr></thead>
        <tbody class="divide-y divide-border bg-card">
          @foreach($products as $product)
            <tr class="hover:bg-muted/30 transition-colors"
                x-show="!search || '{{ strtolower($product->name . ' ' . ($product->category->name ?? '')) }}'.includes(search.toLowerCase())">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  @if($product->image)
                    <img src="{{ $product->image }}" alt="{{ $product->name }}" class="w-9 h-9 rounded-lg object-cover border border-border shrink-0">
                  @else
                    <div class="w-9 h-9 rounded-lg bg-muted border border-border shrink-0 flex items-center justify-center">
                      <svg class="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    </div>
                  @endif
                  <div>
                    <p class="font-medium text-foreground text-sm">{{ $product->name }}</p>
                    @if($product->badge)<span class="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-medium">{{ $product->badge }}</span>@endif
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-muted-foreground text-sm">{{ $product->category->name ?? '—' }}</td>
              <td class="px-4 py-3 font-semibold tabular-nums">{{ number_format($product->price, 0, ',', ' ') }} FCFA</td>
              <td class="px-4 py-3">
                <span class="{{ $product->stock < 5 ? 'text-red-600 font-semibold' : 'text-foreground' }} text-sm">{{ $product->stock }}</span>
              </td>
              <td class="px-4 py-3">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium {{ $product->active ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground' }}">
                  <span class="w-1.5 h-1.5 rounded-full {{ $product->active ? 'bg-green-500' : 'bg-muted-foreground' }}"></span>
                  {{ $product->active ? 'Actif' : 'Inactif' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <a href="{{ route('admin.products.edit', $product) }}" class="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </a>
                  <form method="POST" action="{{ route('admin.products.destroy', $product) }}" onsubmit="return confirm('Supprimer ce produit ?')">
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
