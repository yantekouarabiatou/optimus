@extends('layouts.app')
@section('title', 'Boutique — Matériaux & Équipements Tech | Optimus+ Solutions')

@section('content')

{{-- ── NAVBAR ── --}}
<header class="sticky top-0 z-40 bg-primary/95 backdrop-blur-md shadow-lg shadow-primary/20">
  <div class="container mx-auto px-4 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20 gap-4">
      <div class="flex items-center gap-4 shrink-0">
        <a href="/" class="flex items-center gap-1.5 text-primary-foreground/60 hover:text-accent transition-colors text-base font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          <span class="hidden sm:inline">Accueil</span>
        </a>
        <div class="h-5 w-px bg-primary-foreground/20"></div>
        <a href="/" class="flex items-center gap-2">
          <img src="/logo.jpg" alt="Optimus+" class="w-7 h-7 rounded-lg object-cover">
          <span class="font-extrabold text-white text-lg">OPTIMUS<span class="text-accent">+</span></span>
        </a>
      </div>
      <div class="flex-1 max-w-sm hidden md:block" x-data>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="search" placeholder="Rechercher un produit…"
                 x-model.debounce.400ms="$store.boutique.search"
                 class="w-full pl-9 pr-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50">
        </div>
      </div>
      <button @click="$store.boutique.cartOpen = true" class="relative p-2 text-primary-foreground hover:text-accent transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <span x-show="$store.boutique.cartCount > 0" x-text="$store.boutique.cartCount"
              class="absolute -top-1 -right-1 w-5 h-5 bg-accent text-primary text-xs font-bold rounded-full flex items-center justify-center"></span>
      </button>
    </div>
    <div class="pb-3 md:hidden" x-data>
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="search" placeholder="Rechercher…"
               x-model.debounce.400ms="$store.boutique.search"
               class="w-full pl-9 pr-4 py-2 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 rounded-xl text-sm focus:outline-none">
      </div>
    </div>
  </div>
</header>

{{-- ── HERO ── --}}
<section class="relative h-[55vh] min-h-[420px] overflow-hidden">
  <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80" alt="" class="absolute inset-0 w-full h-full object-cover" loading="eager">
  <div class="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/50"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
  <div class="relative h-full flex items-center justify-center text-center px-4">
    <div class="max-w-3xl">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full mb-6">
        <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        <span class="text-accent text-sm font-medium">Boutique Optimus+</span>
      </div>
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 leading-tight">Matériaux &amp; Équipements Tech</h1>
      <p class="text-xl text-white/70 max-w-2xl mx-auto mb-8">Sélection professionnelle de produits IT, énergie et sécurité livrés partout en Afrique.</p>
      <button onclick="document.getElementById('products').scrollIntoView({behavior:'smooth'})"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-primary font-bold rounded-2xl hover:bg-accent/90 shadow-xl shadow-accent/30 transition-colors">
        Voir nos produits
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
      </button>
    </div>
  </div>
</section>

{{-- ── CATEGORIES ── --}}
<section class="py-14 bg-muted/30">
  <div class="container mx-auto px-4 lg:px-8">
    <h2 class="text-3xl font-bold text-foreground mb-8 text-center">Catégories de produits</h2>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      @foreach($categories as $cat)
        <button type="button"
                @click="$store.boutique.toggleCategory('{{ $cat->slug }}')"
                :class="$store.boutique.category === '{{ $cat->slug }}' ? 'border-accent ring-2 ring-accent/30' : 'border-border hover:border-accent/50'"
                class="group relative rounded-2xl overflow-hidden border text-left transition-all hover:-translate-y-1 hover:shadow-xl">
          <div class="relative h-32 overflow-hidden">
            @if($cat->image)
              <img src="{{ $cat->image }}" alt="{{ $cat->name }}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            @else
              <div class="w-full h-full bg-gradient-to-br from-primary/60 to-primary/40"></div>
            @endif
            <div class="absolute inset-0 bg-primary/60 group-hover:bg-primary/50 transition-colors"></div>
          </div>
          <div :class="$store.boutique.category === '{{ $cat->slug }}' ? 'bg-primary text-primary-foreground' : 'bg-card'"
               class="p-4 transition-colors">
            <p class="font-semibold text-base">{{ $cat->name }}</p>
            <p :class="$store.boutique.category === '{{ $cat->slug }}' ? 'text-primary-foreground/60' : 'text-muted-foreground'"
               class="text-sm mt-0.5">{{ $cat->products_count ?? 0 }} produit(s)</p>
          </div>
        </button>
      @endforeach
    </div>
  </div>
</section>

{{-- ── PRODUCTS ── --}}
<section id="products" class="py-16">
  <div class="container mx-auto px-4 lg:px-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-foreground" x-text="$store.boutique.category ? '{{ implode('|', $categories->pluck('name', 'slug')->toArray()) }}'.split('|').find((v,i,a)=> a.slice(0,i).filter((v2,i2,a2)=>a2.slice(0,i2).every(v3=>v3!==v2)).length >= 0) ?? 'Produits' : 'Tous les produits'">
          Tous les produits
        </h2>
        <p class="text-muted-foreground text-sm mt-1" x-text="$store.boutique.filteredProducts.length + ' produit(s)'"></p>
      </div>
      <button x-show="$store.boutique.category" @click="$store.boutique.category = null"
              class="flex items-center gap-1 text-sm text-accent hover:underline">
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        Effacer le filtre
      </button>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <template x-for="product in $store.boutique.filteredProducts" :key="product.id">
        <div class="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1.5 transition-all duration-300">
          <div class="relative aspect-square overflow-hidden bg-muted">
            <img :src="product.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80'"
                 :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <span x-show="product.badge" x-text="product.badge"
                  :class="product.badge?.toLowerCase() === 'nouveau' ? 'bg-accent text-primary' : 'bg-destructive text-white'"
                  class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold shadow-md"></span>
            <div x-show="product.stock === 0" class="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span class="bg-black/70 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Rupture de stock</span>
            </div>
            <button x-show="product.stock > 0" @click="$store.boutique.addToCart(product)"
                    class="absolute bottom-3 right-3 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-primary transition-all translate-y-2 group-hover:translate-y-0">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
          <div class="p-4">
            <p class="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide" x-text="product.category?.name ?? '—'"></p>
            <h3 class="font-semibold text-foreground mb-3 text-base leading-snug min-h-[2.5rem] line-clamp-2" x-text="product.name"></h3>
            <div class="flex items-center justify-between gap-2">
              <span class="text-lg font-bold text-accent" x-text="new Intl.NumberFormat('fr-FR').format(product.price) + ' FCFA'"></span>
              <button :disabled="product.stock === 0" @click="$store.boutique.addToCart(product)"
                      class="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-accent hover:text-primary transition-colors disabled:opacity-50"
                      x-text="product.stock === 0 ? 'Indisponible' : 'Ajouter'"></button>
            </div>
          </div>
        </div>
      </template>

      <template x-if="$store.boutique.filteredProducts.length === 0 && !$store.boutique.loading">
        <div class="col-span-full text-center py-20">
          <svg class="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <p class="text-muted-foreground text-lg">Aucun produit trouvé</p>
        </div>
      </template>
    </div>
  </div>
</section>

{{-- ── CART SIDEBAR ── --}}
<div x-show="$store.boutique.cartOpen" x-cloak class="fixed inset-0 z-50" @keydown.escape.window="$store.boutique.cartOpen=false">
  <div @click="$store.boutique.cartOpen=false" class="absolute inset-0 bg-black/60 backdrop-blur-sm"
       x-transition:enter="transition duration-200" x-transition:enter-start="opacity-0"
       x-transition:leave="transition duration-150" x-transition:leave-end="opacity-0"></div>
  <div class="absolute top-0 right-0 bottom-0 w-full max-w-md bg-card shadow-2xl flex flex-col border-l border-border"
       x-transition:enter="transition duration-300" x-transition:enter-start="translate-x-full"
       x-transition:leave="transition duration-200" x-transition:leave-end="translate-x-full">

    <div class="p-5 border-b border-border flex items-center justify-between bg-primary shrink-0">
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <h2 class="text-lg font-bold text-primary-foreground">Panier
          <span x-show="$store.boutique.cartCount > 0" x-text="$store.boutique.cartCount"
                class="ml-2 px-2 py-0.5 bg-accent text-primary text-xs font-bold rounded-full"></span>
        </h2>
      </div>
      <button @click="$store.boutique.cartOpen=false" class="p-2 text-primary-foreground/60 hover:text-primary-foreground rounded-lg">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="flex-1 overflow-y-auto p-4">
      <template x-if="$store.boutique.cart.length === 0">
        <div class="h-full flex flex-col items-center justify-center text-center gap-3">
          <svg class="w-16 h-16 text-muted-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
          <p class="text-muted-foreground font-medium">Votre panier est vide</p>
        </div>
      </template>
      <div class="space-y-3">
        <template x-for="item in $store.boutique.cart" :key="item.id">
          <div class="flex gap-3 p-3 bg-muted/50 rounded-xl border border-border">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 rounded-lg object-cover shrink-0 bg-muted" loading="lazy">
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-foreground text-sm line-clamp-1" x-text="item.name"></h4>
              <p class="text-accent font-bold text-sm mt-0.5" x-text="new Intl.NumberFormat('fr-FR').format(item.price) + ' FCFA'"></p>
              <div class="flex items-center gap-2 mt-2">
                <button @click="$store.boutique.updateQty(item.id,-1)" class="w-7 h-7 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
                </button>
                <span class="text-sm font-bold w-6 text-center" x-text="item.quantity"></span>
                <button @click="$store.boutique.updateQty(item.id,1)" class="w-7 h-7 bg-card border border-border rounded-lg flex items-center justify-center hover:border-accent transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                </button>
              </div>
            </div>
            <button @click="$store.boutique.removeItem(item.id)" class="text-muted-foreground hover:text-destructive transition-colors self-start mt-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </template>
      </div>
    </div>

    <template x-if="$store.boutique.cart.length > 0">
      <div class="p-4 border-t border-border space-y-4 bg-card shrink-0">
        <div class="flex justify-between items-center">
          <span class="text-muted-foreground text-sm">Total estimé</span>
          <span class="text-xl font-extrabold text-foreground" x-text="new Intl.NumberFormat('fr-FR').format($store.boutique.cartTotal) + ' FCFA'"></span>
        </div>
        <div class="space-y-2">
          <input x-model="$store.boutique.customerName" type="text" placeholder="Votre nom complet *" required
                 class="w-full px-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1a2 2 0 002 2z"/></svg>
            <input x-model="$store.boutique.customerPhone" type="tel" placeholder="Téléphone (optionnel)"
                   class="w-full pl-9 pr-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <input x-model="$store.boutique.address" type="text" placeholder="Adresse de livraison"
                   class="w-full pl-9 pr-4 py-2.5 border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
          </div>
        </div>
        <div class="bg-green-50 border border-green-200 rounded-xl p-3 space-y-1.5">
          <p class="text-xs font-semibold text-green-800 uppercase tracking-wide">Dépôt après confirmation</p>
          <p class="text-sm text-green-700">MTN MoMo : <strong>+229 53 86 08 57</strong></p>
          <p class="text-xs text-green-600">Envoyez la preuve de paiement via WhatsApp après le dépôt.</p>
        </div>
        <button @click="$store.boutique.openWhatsApp()" :disabled="$store.boutique.submitting"
                class="w-full h-12 flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-70 text-white font-bold rounded-xl text-base shadow-lg transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          <span x-text="$store.boutique.submitting ? 'Enregistrement…' : 'Commander via WhatsApp'"></span>
        </button>
        <p class="text-center text-xs text-muted-foreground">WhatsApp s'ouvre avec votre commande pré-remplie</p>
      </div>
    </template>
  </div>
</div>

@push('head')
<script>
  document.addEventListener('alpine:init', () => {
    Alpine.store('boutique', {
      products: @json($products->values()),
      cart: JSON.parse(localStorage.getItem('optimus_cart') ?? '[]'),
      search: '',
      category: null,
      cartOpen: false,
      submitting: false,
      customerName: '', customerPhone: '', address: '',

      get filteredProducts() {
        return this.products.filter(p => {
          const matchCat = !this.category || p.category?.slug === this.category;
          const matchSearch = !this.search || p.name.toLowerCase().includes(this.search.toLowerCase());
          return matchCat && matchSearch;
        });
      },
      get cartCount() { return this.cart.reduce((s,i)=>s+i.quantity,0); },
      get cartTotal() { return this.cart.reduce((s,i)=>s+i.price*i.quantity,0); },

      toggleCategory(slug) {
        this.category = this.category === slug ? null : slug;
      },
      addToCart(product) {
        const existing = this.cart.find(i => i.id === product.id);
        if (existing) existing.quantity++;
        else this.cart.push({id:product.id,name:product.name,price:product.price,quantity:1,image:product.image||''});
        this.saveCart();
      },
      updateQty(id, delta) {
        const item = this.cart.find(i=>i.id===id);
        if (!item) return;
        item.quantity = Math.max(0, item.quantity + delta);
        if (item.quantity === 0) this.cart = this.cart.filter(i=>i.id!==id);
        this.saveCart();
      },
      removeItem(id) { this.cart = this.cart.filter(i=>i.id!==id); this.saveCart(); },
      saveCart() { localStorage.setItem('optimus_cart', JSON.stringify(this.cart)); },

      async openWhatsApp() {
        if (!this.customerName.trim()) { alert('Veuillez entrer votre nom.'); return; }
        this.submitting = true;
        let reference = '';
        try {
          const r = await fetch('/boutique/order', {
            method: 'POST',
            headers: {'Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name=csrf-token]').content,'Accept':'application/json'},
            body: JSON.stringify({
              customer_name: this.customerName.trim(),
              customer_phone: this.customerPhone.trim() || null,
              customer_address: this.address.trim() || null,
              items: this.cart.map(i=>({product_name:i.name,product_price:i.price,quantity:i.quantity}))
            })
          });
          const d = await r.json();
          reference = d.reference ?? '';
          if (r.ok) { this.cart = []; this.saveCart(); this.customerName=''; this.customerPhone=''; this.address=''; }
        } catch(e){}
        this.submitting = false;
        const lines = [
          'Bonjour Optimus+ Solutions !','',
          'Je souhaite passer une commande :',
          ...(reference ? ['Ref commande : '+reference,''] : []),
          'Nom : '+this.customerName.trim(),
          ...(this.customerPhone ? ['Tel : '+this.customerPhone] : []),
          '','Detail de la commande :',
          ...this.cart.map(i=>'- '+i.name+' x'+i.quantity+' : '+new Intl.NumberFormat('fr-FR').format(i.price*i.quantity)+' FCFA'),
          '','Total : '+new Intl.NumberFormat('fr-FR').format(this.cartTotal)+' FCFA',
          '','Adresse de livraison : '+(this.address||'a preciser'),
          '','Je vais effectuer le dépôt et vous envoyer la preuve de paiement.','Merci !'
        ];
        window.open('https://wa.me/22953860857?text='+encodeURIComponent(lines.join('\n')),'_blank');
      }
    });
  });
</script>
@endpush

@endsection
