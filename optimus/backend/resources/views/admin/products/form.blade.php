@extends('layouts.admin')
@section('title', isset($product) ? 'Modifier '.$product->name : 'Nouveau produit')
@section('breadcrumb', isset($product) ? 'Modifier un produit' : 'Nouveau produit')

@section('content')
<div>
  <div class="flex items-center gap-3 mb-6">
    <a href="{{ route('admin.products.index') }}" class="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
    </a>
    <h1 class="text-2xl font-bold text-foreground">{{ isset($product) ? 'Modifier le produit' : 'Nouveau produit' }}</h1>
  </div>

  @if($errors->any())
    <div class="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
      <ul class="list-disc list-inside space-y-1">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
    </div>
  @endif

  <div class="bg-white rounded-2xl border border-border p-7 shadow-sm">
    <form method="POST"
          action="{{ isset($product) ? route('admin.products.update', $product) : route('admin.products.store') }}"
          enctype="multipart/form-data">
      @csrf
      @if(isset($product)) @method('PUT') @endif

      <div class="space-y-5">
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Nom *</label>
            <input name="name" type="text" required value="{{ old('name', $product->name ?? '') }}"
                   class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Catégorie *</label>
            <select name="category_id" required data-placeholder="Choisir une catégorie…"
                    class="select2 w-full border border-input rounded-xl text-sm bg-background">
              <option value=""></option>
              @foreach($categories as $cat)
                <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id ?? '') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
              @endforeach
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-foreground mb-1.5">Description</label>
          <textarea name="description" rows="3"
                    class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50 resize-none">{{ old('description', $product->description ?? '') }}</textarea>
        </div>

        <div class="grid sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Prix (FCFA) *</label>
            <input name="price" type="number" min="0" required value="{{ old('price', $product->price ?? '') }}"
                   class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Stock</label>
            <input name="stock" type="number" min="0" value="{{ old('stock', $product->stock ?? 0) }}"
                   class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-1.5">Badge</label>
            <input name="badge" type="text" value="{{ old('badge', $product->badge ?? '') }}" placeholder="Nouveau, Promo…"
                   class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
        </div>

        <div x-data="{ preview: '{{ $product->image ?? '' }}' }">
          <label class="block text-sm font-medium text-foreground mb-1.5">Image</label>
          <input type="file" name="image" accept="image/*"
                 @change="preview = URL.createObjectURL($event.target.files[0])"
                 class="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium hover:file:bg-primary/90 file:transition-colors">
          <div x-show="preview" class="mt-3 relative rounded-xl overflow-hidden border border-border aspect-video">
            <img :src="preview" alt="Aperçu" class="w-full h-full object-cover">
          </div>
        </div>

        <div class="flex items-center gap-3">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="hidden" name="active" value="0">
            <input type="checkbox" name="active" value="1" {{ old('active', $product->active ?? true) ? 'checked' : '' }} class="sr-only peer">
            <div class="w-10 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors"></div>
            <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow"></div>
          </label>
          <span class="text-sm text-foreground">Produit actif</span>
        </div>
      </div>

      <div class="flex gap-3 mt-6 pt-6 border-t border-border">
        <button type="submit" class="flex-1 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors">
          {{ isset($product) ? 'Enregistrer les modifications' : 'Créer le produit' }}
        </button>
        <a href="{{ route('admin.products.index') }}" class="px-6 py-2.5 border border-border text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
          Annuler
        </a>
      </div>
    </form>
  </div>
</div>
@endsection
