@extends('layouts.app')

@section('content')

{{-- ── NAVBAR ─────────────────────────────────────────────────────────────── --}}
<nav x-data="{ scrolled: false, mobileOpen: false }"
     @scroll.window="scrolled = window.scrollY > 20"
     :class="scrolled ? 'bg-primary/98 shadow-xl shadow-primary/30' : 'bg-primary/95'"
     class="fixed top-0 inset-x-0 z-50 backdrop-blur-md transition-all duration-300">
  <div class="container mx-auto px-4 lg:px-8">
    <div class="flex items-center justify-between h-16 lg:h-20">
      <a href="/" class="flex items-center gap-3 shrink-0">
        <img src="/logo.jpg" alt="Optimus+" class="w-9 h-9 rounded-lg object-cover">
        <div>
          <span class="font-extrabold text-white text-lg leading-none tracking-tight">OPTIMUS<span class="text-accent">+</span></span>
          <div class="text-white/50 text-[9px] tracking-widest uppercase leading-none mt-0.5">Solutions</div>
        </div>
      </a>
      <div class="hidden lg:flex items-center gap-8">
        @foreach(['#accueil'=>'Accueil','#apropos'=>'À propos','#services'=>'Services','#equipe'=>'Équipe','#contact'=>'Contact'] as $href => $label)
          <a href="{{ $href }}" class="text-white/75 hover:text-accent transition-colors text-base font-medium">{{ $label }}</a>
        @endforeach
      </div>
      <div class="flex items-center gap-3">
        <a href="/boutique" class="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-accent text-primary font-bold text-base rounded-xl hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          Boutique
        </a>
        <a href="{{ route('admin.login') }}" title="Espace administrateur"
           class="hidden lg:flex items-center gap-1.5 px-4 py-2.5 text-white/50 hover:text-white/90 text-sm border border-white/20 rounded-lg hover:border-white/50 transition-all duration-200">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          Connexion
        </a>
        <button @click="mobileOpen=!mobileOpen" class="lg:hidden p-2 text-white/70 hover:text-white">
          <svg x-show="!mobileOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg x-show="mobileOpen" x-cloak class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </div>
    <div x-show="mobileOpen" x-cloak @click.outside="mobileOpen=false"
         x-transition:enter="transition duration-200" x-transition:enter-start="-translate-y-2 opacity-0"
         x-transition:leave="transition duration-150" x-transition:leave-end="-translate-y-2 opacity-0"
         class="lg:hidden pb-4 border-t border-white/10 pt-3 space-y-1">
      @foreach(['#accueil'=>'Accueil','#apropos'=>'À propos','#services'=>'Services','#equipe'=>'Équipe','#contact'=>'Contact'] as $href => $label)
        <a href="{{ $href }}" @click="mobileOpen=false" class="block px-4 py-3 text-white/75 hover:text-accent text-base font-medium rounded-lg hover:bg-white/5">{{ $label }}</a>
      @endforeach
      <a href="/boutique" class="block px-4 py-3 text-accent font-bold text-base">Boutique</a>
      <a href="{{ route('admin.login') }}" class="block px-4 py-3 text-white/40 hover:text-white/70 text-base transition-colors">
        🔒 Espace Admin
      </a>
    </div>
  </div>
</nav>

{{-- ── HERO CAROUSEL ────────────────────────────────────────────────────────── --}}
<section id="accueil"
  x-data="{
    current: 0,
    slides: [
      { bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80', badge:'IT & Infrastructure', title:'Solutions Technologiques', sub:'pour l\'Afrique', desc:'Infrastructure, cybersécurité et solutions cloud pour accélérer votre transformation digitale.' },
      { bg: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80', badge:'Intelligence Artificielle', title:'L\'IA au service', sub:'de votre entreprise', desc:'Des solutions d\'intelligence artificielle sur mesure pour optimiser vos processus.' },
      { bg: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80', badge:'Énergie Solaire', title:'Énergie propre', sub:'& durable', desc:'Systèmes solaires et solutions énergétiques adaptés aux besoins africains.' },
      { bg: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=80', badge:'Cybersécurité', title:'Protégez vos', sub:'actifs numériques', desc:'Audits, protection avancée et formation pour sécuriser votre entreprise.' },
    ],
    autoplay: null,
    start() { this.autoplay = setInterval(() => this.next(), 6000) },
    next() { this.current = (this.current + 1) % this.slides.length },
    prev() { this.current = (this.current - 1 + this.slides.length) % this.slides.length },
    go(i) { this.current = i; clearInterval(this.autoplay); this.start() }
  }" x-init="start()"
  class="relative h-screen min-h-[600px] overflow-hidden pt-16 lg:pt-20">

  <template x-for="(slide, i) in slides" :key="i">
    <div x-show="current === i"
         x-transition:enter="transition duration-1000" x-transition:enter-start="opacity-0"
         x-transition:leave="transition duration-500" x-transition:leave-end="opacity-0"
         class="absolute inset-0">
      <img :src="slide.bg" alt="" class="w-full h-full object-cover" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/75 to-primary/40"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
    </div>
  </template>

  <div class="relative h-full flex items-center justify-center">
    <div class="container mx-auto px-4 lg:px-8">
      <template x-for="(slide, i) in slides" :key="'c'+i">
        <div x-show="current === i"
             x-transition:enter="transition duration-700 delay-200" x-transition:enter-start="opacity-0 translate-y-4"
             x-transition:leave="transition duration-300" x-transition:leave-end="opacity-0"
             class="max-w-5xl mx-auto text-center">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full text-accent text-sm font-medium mb-8"
                x-text="slide.badge"></span>
          <h1 class="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-tight mb-4">
            <span x-text="slide.title"></span><br>
            <span class="text-accent" x-text="slide.sub"></span>
          </h1>
          <p class="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 mt-6" x-text="slide.desc"></p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="#contact"
               class="flex items-center gap-2 px-8 py-4 bg-accent text-primary font-bold text-lg rounded-2xl hover:bg-accent/90 shadow-xl shadow-accent/30 transition-colors">
              Démarrer un projet
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
            <a href="/boutique"
               class="flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:border-accent hover:text-accent transition-colors">
              Notre boutique
            </a>
          </div>
        </div>
      </template>
    </div>
  </div>

  {{-- Controls --}}
  <button @click="prev()" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <button @click="next()" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
  </button>
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
    <template x-for="(s, i) in slides" :key="i">
      <button @click="go(i)" :class="current===i ? 'bg-accent w-6' : 'bg-white/40 w-2'" class="h-2 rounded-full transition-all duration-300"></button>
    </template>
  </div>
</section>

{{-- Séparateur : Accueil → À propos --}}
<div class="relative h-14 sm:h-20 md:h-28 bg-primary overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-background" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,70 C240,20 480,100 720,60 C960,20 1200,90 1440,50 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── À PROPOS ─────────────────────────────────────────────────────────────── --}}
<section id="apropos" class="py-16 lg:py-24 bg-background scroll-mt-16 lg:scroll-mt-20">
  <div class="container mx-auto px-4 lg:px-8">
    <div data-aos="fade-up" class="text-center max-w-3xl mx-auto mb-14">
      <span class="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-5">À propos de nous</span>
      <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
        L'innovation technologique <span class="text-accent">au cœur de l'Afrique</span>
      </h2>
    </div>
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <div data-aos="fade-right">
        <p class="text-muted-foreground text-xl leading-relaxed mb-6 text-justify">
          Fondée à Porto-Novo, Bénin, <strong class="text-foreground">OPTIMUS+ SOLUTIONS SARL</strong> accompagne les entreprises africaines dans leur transformation digitale depuis 2019. Nous combinons expertise technique et connaissance du terrain pour créer des solutions adaptées.
        </p>
        <p class="text-muted-foreground text-lg leading-relaxed mb-10 text-justify">
          Notre équipe pluridisciplinaire maîtrise les technologies les plus avancées tout en restant ancrée dans les réalités africaines, pour des solutions efficaces et durables.
        </p>
        <div class="grid grid-cols-2 gap-6">
          @foreach([['5+','Années d\'expérience'],['50+','Projets livrés'],['4','Domaines d\'expertise'],['100%','Satisfaction client']] as [$val, $lbl])
            <div data-aos="fade-up" data-delay="{{ $loop->index * 100 }}" class="bg-card border border-border rounded-2xl p-5">
              <div class="text-3xl font-extrabold text-accent mb-1">{{ $val }}</div>
              <div class="text-muted-foreground text-sm">{{ $lbl }}</div>
            </div>
          @endforeach
        </div>
      </div>
      <div class="relative" data-aos="fade-left">
        <div class="rounded-3xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80" alt="Équipe Optimus+" class="w-full h-80 object-cover" loading="lazy">
        </div>
        <div class="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-5 shadow-xl hidden md:block">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <div>
              <p class="font-bold text-foreground text-sm">Porto-Novo & Cotonou</p>
              <p class="text-muted-foreground text-xs">Bénin, Afrique de l'Ouest</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{{-- Séparateur : À propos → Services --}}
<div class="relative h-12 sm:h-16 md:h-20 bg-background overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-muted" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,90 Q720,10 1440,90 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── SERVICES ─────────────────────────────────────────────────────────────── --}}
<section id="services" class="py-20 lg:py-32 bg-muted scroll-mt-16 lg:scroll-mt-20">
  <div class="container mx-auto px-4 lg:px-8">
    <div data-aos="fade-up" class="text-center max-w-3xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">Nos Domaines d'Expertise</span>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-5">Des solutions technologiques complètes</h2>
      <p class="text-xl text-muted-foreground">Nous offrons une gamme complète de services pour accompagner votre transformation digitale.</p>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      @php
        $services = [
          ['IT & Infrastructure','Conception, déploiement et maintenance d\'infrastructures informatiques robustes et scalables pour votre entreprise.','https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80','from-blue-500/10 to-blue-600/5','text-blue-500'],
          ['Intelligence Artificielle','Solutions IA sur mesure : machine learning, automatisation intelligente et analyse prédictive pour optimiser vos processus.','https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80','from-violet-500/10 to-violet-600/5','text-violet-500'],
          ['Solutions Énergétiques','Systèmes solaires et solutions énergétiques durables adaptées aux besoins spécifiques du continent africain.','https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80','from-amber-500/10 to-amber-600/5','text-amber-500'],
          ['Sécurité Informatique','Protection complète de vos actifs numériques avec des solutions de cybersécurité avancées et audits de sécurité.','https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80','from-green-500/10 to-green-600/5','text-green-500'],
          ['Design & UX','Création d\'expériences utilisateur exceptionnelles avec des interfaces modernes, intuitives et accessibles.','https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80','from-rose-500/10 to-rose-600/5','text-rose-500'],
          ['Formation & Accompagnement','Programmes de formation personnalisés pour développer les compétences techniques de vos équipes.','/formation.jpg','from-cyan-500/10 to-cyan-600/5','text-cyan-500'],
        ];
      @endphp
      @foreach($services as [$title, $desc, $img, $grad, $color])
        <div data-aos="fade-up" data-delay="{{ ($loop->index % 3) * 150 }}" class="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
          <div class="relative h-44 overflow-hidden">
            <img src="{{ $img }}" alt="{{ $title }}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent"></div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-foreground mb-2">{{ $title }}</h3>
            <p class="text-muted-foreground text-base leading-relaxed text-justify">{{ $desc }}</p>
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>

{{-- Séparateur : Services → Mission --}}
<div class="relative h-14 sm:h-20 md:h-24 bg-muted overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-primary" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,90 L1440,30 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── MISSION ──────────────────────────────────────────────────────────────── --}}
<section class="py-20 lg:py-32 bg-primary relative overflow-hidden">
  <div class="absolute inset-0 opacity-5 pointer-events-none">
    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  </div>
  <div class="container mx-auto px-4 lg:px-8 relative">
    <div data-aos="fade-up" class="text-center max-w-3xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent rounded-full text-sm font-medium mb-6">Notre Mission</span>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Propulser l'Afrique dans l'ère numérique</h2>
      <p class="text-white/70 text-lg">Nous créons les solutions technologiques qui permettent aux entreprises africaines de rivaliser sur la scène mondiale.</p>
    </div>
    @php
      $missions = [
        ['icon'=>'bulb','title'=>'Innovation','desc'=>'Nous adoptons les technologies les plus avancées pour créer des solutions novatrices adaptées au contexte africain.'],
        ['icon'=>'star','title'=>'Excellence','desc'=>'Chaque projet est traité avec le plus haut niveau de professionnalisme et d\'expertise technique.'],
        ['icon'=>'globe','title'=>'Impact','desc'=>'Notre objectif est de créer un impact économique et social positif durable pour nos clients.'],
      ];
    @endphp
    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      @foreach($missions as $m)
        <div data-aos="zoom-in" data-delay="{{ $loop->index * 150 }}"
             class="group relative overflow-hidden bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all duration-300 {{ $loop->iteration === 2 ? 'md:-translate-y-4' : '' }}">
          <span class="absolute top-4 right-6 text-6xl font-black text-white/10 select-none pointer-events-none leading-none">0{{ $loop->iteration }}</span>
          <div class="relative w-14 h-14 bg-accent/15 border border-accent/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-accent/25 transition-all duration-300">
            @switch($m['icon'])
              @case('bulb')
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3a6 6 0 00-3.6 10.8c.5.4.6 1 .6 1.6v.1a1 1 0 001 1h4a1 1 0 001-1v-.1c0-.6.1-1.2.6-1.6A6 6 0 0012 3z"/></svg>
                @break
              @case('star')
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.914c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                @break
              @case('globe')
                <svg class="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.6 9h16.8M3.6 15h16.8M12 3a14.5 14.5 0 010 18M12 3a14.5 14.5 0 000 18"/></svg>
            @endswitch
          </div>
          <h3 class="relative text-2xl font-bold text-white mb-3">{{ $m['title'] }}</h3>
          <p class="relative text-white/60 text-base leading-relaxed text-justify">{{ $m['desc'] }}</p>
        </div>
      @endforeach
    </div>
  </div>
</section>

{{-- Séparateur : Mission → Équipe --}}
<div class="relative h-14 sm:h-20 md:h-28 bg-primary overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-background" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,60 C160,20 320,100 480,70 C640,40 800,110 960,70 C1120,30 1280,100 1440,55 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── ÉQUIPE ───────────────────────────────────────────────────────────────── --}}
<section id="equipe" class="py-20 lg:py-32 bg-background scroll-mt-16 lg:scroll-mt-20">
  <div class="container mx-auto px-4 lg:px-8">
    <div data-aos="fade-up" class="text-center max-w-2xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">Notre équipe</span>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Des talents béninois passionnés</h2>
      <p class="text-muted-foreground text-xl">Une équipe engagée à Porto-Novo et Cotonou, au service de votre transformation digitale depuis 5 ans.</p>
    </div>

    @php
      $team = [
        ['TOSSOU R.T. Lionel','Directeur Général','Porto-Novo','Vision stratégique · Direction · Innovation','/LT.jpeg','from-blue-600 to-blue-800','https://www.linkedin.com/in/lionel-tossou-32b15a230/','https://wa.me/22996622903'],
        ['YANTEKOUA Rabiatou','Directrice / Responsable Service Dév. Web','Cotonou','Next.js · Laravel · Architecture logicielle','/YR.png','from-violet-600 to-purple-800','https://www.linkedin.com/in/rabiatou-yantekoua-56b776277/','https://wa.me/22953860857'],
        ['Valentin TOSSOU','Directeur / Responsable Technique','Porto-Novo','Infrastructure · Systèmes · Sécurité','/VT.jpeg','from-teal-600 to-cyan-800','https://www.linkedin.com/in/avmt/','https://wa.me/22996935517'],
        ['Nassirou KPASSO','Directeur / Responsable Marketing & Support Client','Cotonou','Marketing Digital · Support Client · Communication','/NK.jpeg','from-rose-500 to-pink-700','https://www.linkedin.com/in/nassirou-kpasso-190759219/','https://wa.me/22994199760'],
      ];
    @endphp

    <div x-data="{
      lightbox: null, track: null, auto: null,
      step() { return this.track.firstElementChild.getBoundingClientRect().width + 24 },
      startAuto() {
        this.stopAuto();
        this.auto = setInterval(() => {
          const max = this.track.scrollWidth - this.track.clientWidth;
          if (this.track.scrollLeft >= max - 10) { this.track.scrollTo({ left: 0, behavior: 'smooth' }); }
          else { this.track.scrollBy({ left: this.step(), behavior: 'smooth' }); }
        }, 3000);
      },
      stopAuto() { clearInterval(this.auto); },
      pauseThenResume() { this.stopAuto(); clearTimeout(this.resumeTimer); this.resumeTimer = setTimeout(() => this.startAuto(), 4000); }
    }" x-init="track = $refs.track; startAuto()">
      <div class="relative" @mouseenter="stopAuto()" @mouseleave="startAuto()" @touchstart="stopAuto()" @touchend="pauseThenResume()">
        {{-- Flèche gauche (desktop) --}}
        <button @click="pauseThenResume(); track.scrollBy({left:-336, behavior:'smooth'})"
                class="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-accent hover:text-white hover:border-accent transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <div x-ref="track" class="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 lg:mx-0 lg:px-1">
          @foreach($team as [$name, $role, $location, $specialty, $photo, $gradient, $linkedin, $whatsapp])
            <div data-aos="fade-up" data-delay="{{ $loop->index * 100 }}"
                 class="group shrink-0 snap-center w-64 sm:w-72 bg-card rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <button type="button" @click="lightbox = {{ json_encode(compact('name','role','location','photo','gradient')) }}"
                      class="relative w-full block bg-gradient-to-br {{ $gradient }} overflow-hidden focus:outline-none" style="aspect-ratio:1/1">
                <img src="{{ $photo }}" alt="{{ $name }}" loading="lazy"
                     class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div class="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-lg">
                    <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                  </div>
                </div>
              </button>
              <div class="p-5">
                <h3 class="font-bold text-foreground text-lg leading-tight mb-0.5">{{ $name }}</h3>
                <p class="text-accent text-sm font-medium mb-2">{{ $role }}</p>
                <div class="flex items-center gap-1.5 mb-3">
                  <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span class="text-xs text-muted-foreground">{{ $location }}</span>
                </div>
                <p class="text-xs text-muted-foreground border-t border-border pt-3 mb-4">{{ $specialty }}</p>
                <div class="flex gap-2">
                  <a href="#contact" class="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-accent border border-border rounded-lg py-2 hover:border-accent/50 transition-colors">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    Contact
                  </a>
                  @if($linkedin)
                    <a href="{{ $linkedin }}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-[#0A66C2] border border-border rounded-lg py-2 hover:border-[#0A66C2]/50 transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  @elseif($whatsapp)
                    <a href="{{ $whatsapp }}" target="_blank" rel="noopener noreferrer" class="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-[#25D366] border border-border rounded-lg py-2 hover:border-[#25D366]/50 transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="w-3.5 h-3.5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      WhatsApp
                    </a>
                  @endif
                </div>
              </div>
            </div>
          @endforeach
        </div>

        {{-- Flèche droite (desktop) --}}
        <button @click="pauseThenResume(); track.scrollBy({left:336, behavior:'smooth'})"
                class="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center bg-card border border-border rounded-full shadow-lg hover:bg-accent hover:text-white hover:border-accent transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <p class="lg:hidden text-center text-xs text-muted-foreground mt-2">← Faites glisser pour découvrir toute l'équipe →</p>

      {{-- Lightbox --}}
      <div x-show="lightbox" x-cloak @click="lightbox=null"
           class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
           x-transition:enter="transition duration-200" x-transition:enter-start="opacity-0"
           x-transition:leave="transition duration-150" x-transition:leave-end="opacity-0">
        <div @click.stop class="relative max-w-sm w-full bg-card rounded-3xl overflow-hidden shadow-2xl border border-border"
             x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 scale-90"
             x-transition:leave="transition duration-150" x-transition:leave-end="opacity-0 scale-90">
          <button @click="lightbox=null" class="absolute top-3 right-3 z-10 w-9 h-9 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div class="relative" style="aspect-ratio:3/4" :class="'bg-gradient-to-br ' + (lightbox?.gradient ?? '')">
            <img :src="lightbox?.photo" :alt="lightbox?.name" class="w-full h-full object-cover object-top">
          </div>
          <div class="px-5 py-4">
            <h3 class="font-bold text-foreground text-base" x-text="lightbox?.name"></h3>
            <p class="text-accent text-sm font-medium mt-0.5" x-text="lightbox?.role"></p>
            <p class="text-xs text-muted-foreground mt-1" x-text="(lightbox?.location ?? '') + ' · Bénin'"></p>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <p class="text-muted-foreground text-sm">
        Vous souhaitez rejoindre l'équipe ?
        <a href="mailto:contact@optimussolutions.com" class="text-accent hover:underline font-medium">contact@optimussolutions.com</a>
      </p>
    </div>
  </div>
</section>

{{-- Séparateur : Équipe → Contact --}}
<div class="relative h-12 sm:h-16 md:h-20 bg-background overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-muted" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,50 Q720,130 1440,50 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── CONTACT ──────────────────────────────────────────────────────────────── --}}
<section id="contact" class="py-20 lg:py-32 bg-muted scroll-mt-16 lg:scroll-mt-20">
  <div class="container mx-auto px-4 lg:px-8">
    <div data-aos="fade-up" class="text-center max-w-2xl mx-auto mb-16">
      <span class="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">Contact</span>
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Démarrons votre projet</h2>
      <p class="text-muted-foreground text-xl">Décrivez votre projet et nous vous répondrons sous 24h.</p>
    </div>
    <div class="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
      {{-- Form --}}
      <div x-data="{
        form: { name:'', email:'', subject:'', message:'' },
        loading: false, success: false, error: '',
        async submit() {
          this.loading = true; this.error = '';
          try {
            const r = await fetch('/contact', {
              method:'POST',
              headers:{'Content-Type':'application/json','X-CSRF-TOKEN':document.querySelector('meta[name=csrf-token]').content,'Accept':'application/json'},
              body: JSON.stringify(this.form)
            });
            const d = await r.json();
            if (!r.ok) throw new Error(d.message ?? 'Erreur');
            this.success = true; this.form = {name:'',email:'',subject:'',message:''};
            setTimeout(() => this.success = false, 6000);
          } catch(e) { this.error = e.message; }
          finally { this.loading = false; }
        }
      }" class="bg-card rounded-3xl border border-border p-8 shadow-sm">

        <div x-show="success"
             x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 -translate-y-2"
             class="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl text-center">
          <div class="text-2xl mb-2">✅</div>
          <p class="font-semibold text-green-800">Message envoyé !</p>
          <p class="text-green-600 text-sm mt-1">Nous vous répondrons sous 24h.</p>
        </div>

        <div x-show="error" x-text="error"
             class="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"></div>

        <form @submit.prevent="submit" class="space-y-4">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-base font-medium text-foreground mb-2">Nom complet *</label>
              <input x-model="form.name" type="text" required placeholder="Votre nom" class="w-full px-4 py-3 bg-background border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors">
            </div>
            <div>
              <label class="block text-base font-medium text-foreground mb-2">Email *</label>
              <input x-model="form.email" type="email" required placeholder="votre@email.com" class="w-full px-4 py-3 bg-background border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors">
            </div>
          </div>
          <div>
            <label class="block text-base font-medium text-foreground mb-2">Sujet *</label>
            <input x-model="form.subject" type="text" required placeholder="Objet de votre message" class="w-full px-4 py-3 bg-background border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors">
          </div>
          <div>
            <label class="block text-base font-medium text-foreground mb-2">Message *</label>
            <textarea x-model="form.message" rows="5" required placeholder="Décrivez votre projet..." class="w-full px-4 py-3 bg-background border border-input rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring transition-colors resize-none"></textarea>
          </div>
          <button type="submit" :disabled="loading" class="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-bold text-base rounded-2xl hover:bg-primary/90 disabled:opacity-70 transition-colors shadow-lg">
            <span x-text="loading ? 'Envoi en cours...' : 'Envoyer le message'"></span>
            <svg x-show="!loading" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </form>
      </div>
      {{-- Info --}}
      <div class="space-y-6">
        @foreach([['','Adresse','Porto-Novo & Cotonou, Bénin, Afrique de l\'Ouest'],['','Téléphone','+229 01 40 84 19 00'],['','Email','contact@optimussolutions.com'],['','Horaires','Lun – Ven : 8h00 – 18h00']] as [$emoji, $label, $value])
          <div class="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl">
            <span class="text-2xl">{{ $emoji }}</span>
            <div>
              <p class="font-semibold text-foreground text-sm">{{ $label }}</p>
              <p class="text-muted-foreground text-sm mt-0.5">{{ $value }}</p>
            </div>
          </div>
        @endforeach
        <div class="p-5 bg-primary rounded-2xl">
          <p class="text-white/70 text-sm mb-3">Réponse rapide via WhatsApp</p>
          <a href="https://wa.me/2290140841900" target="_blank"
             class="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-bold rounded-xl text-sm hover:bg-[#20bd5a] transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Contacter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

{{-- Séparateur : Contact → Footer --}}
<div class="relative h-12 sm:h-16 md:h-20 bg-muted overflow-hidden" aria-hidden="true">
  <svg class="absolute inset-0 w-full h-full text-primary" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="currentColor">
    <path d="M0,120 L0,80 C360,140 1080,20 1440,70 L1440,120 Z"></path>
  </svg>
</div>

{{-- ── FOOTER ───────────────────────────────────────────────────────────────── --}}
<footer class="bg-primary text-white py-12">
  <div class="container mx-auto px-4 lg:px-8">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <div class="lg:col-span-2">
        <a href="/" class="flex items-center gap-3 mb-4">
          <img src="/logo.jpg" alt="Optimus+" class="w-10 h-10 rounded-xl object-cover">
          <span class="font-extrabold text-xl">OPTIMUS<span class="text-accent">+</span> SOLUTIONS</span>
        </a>
        <p class="text-white/60 text-sm leading-relaxed max-w-xs">Votre partenaire technologique au Bénin. Solutions IT, IA, Énergie et Formation.</p>
        <p class="text-white/40 text-xs mt-3">+229 01 40 84 19 00</p>
      </div>
      <div>
        <p class="font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">Navigation</p>
        <ul class="space-y-2">
          @foreach(['#accueil'=>'Accueil','#apropos'=>'À propos','#services'=>'Services','#equipe'=>'Équipe','#contact'=>'Contact','/boutique'=>'Boutique'] as $href => $label)
            <li><a href="{{ $href }}" class="text-white/50 hover:text-accent text-sm transition-colors">{{ $label }}</a></li>
          @endforeach
        </ul>
      </div>
      <div>
        <p class="font-semibold text-white/80 text-sm mb-4 uppercase tracking-wider">Contact</p>
        <ul class="space-y-2 text-sm text-white/50">
          <li>Porto-Novo, Bénin</li>
          <li>+229 01 40 84 19 00</li>
          <li><a href="mailto:contact@optimussolutions.com" class="hover:text-accent transition-colors">contact@optimussolutions.com</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
      <p>© {{ date('Y') }} OPTIMUS+ SOLUTIONS SARL. Tous droits réservés.</p>
      <a href="/admin" class="hover:text-white/60 transition-colors">Administration</a>
    </div>
  </div>
</footer>

{{-- ── CHATBOT ──────────────────────────────────────────────────────────────── --}}
<div x-data="{
  open: false,
  messages: [{role:'bot', text:'Bonjour ! Je suis l\'assistant Optimus+. Comment puis-je vous aider ?'}],
  input: '',
  loading: false,
  async send() {
    if (!this.input.trim() || this.loading) return;
    const q = this.input.trim(); this.input = ''; this.loading = true;
    this.messages.push({role:'user', text:q});
    await new Promise(r => setTimeout(r, 800));
    const responses = [
      [['bonjour','salut','bonsoir'],   'Bonjour ! Je suis l\'assistant Optimus+. Comment puis-je vous aider ? 😊'],
      [['service','domaine','expertise','proposez','offrez'], 'Nous proposons 6 domaines d\'expertise :\n• IT & Infrastructure\n• Intelligence Artificielle\n• Cybersécurité\n• Énergie solaire\n• Design & UX\n• Formation digitale'],
      [['contact','contacter','joindre','téléphone','appeler'], 'Contactez-nous :\n +229 01 40 84 19 00\n contact@optimussolutions.com\n Porto-Novo & Cotonou, Bénin'],
      [['situé','adresse','localisation','où','bénin','porto','cotonou'], 'Nous sommes basés à Porto-Novo et Cotonou, au Bénin (Afrique de l\'Ouest). Nous intervenons dans toute l\'Afrique. 🌍'],
      [['devis','prix','tarif','coût','budget'], 'Nos tarifs sont adaptés à chaque projet. Décrivez votre besoin via le formulaire de contact ou appelez le +229 01 40 84 19 00 pour un devis gratuit !'],
      [['boutique','produit','acheter','équipement','matériel'], 'Visitez notre boutique pour découvrir notre sélection de produits IT, énergie et sécurité livrés partout en Afrique 🛒'],
      [['merci','super','parfait','bravo'], 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions 😊'],
    ];
    const lower = q.toLowerCase();
    const match = responses.find(([keys]) => keys.some(k => lower.includes(k)));
    let reply = match ? match[1] : 'Pour plus d\'informations, n\'hésitez pas à nous contacter au +229 01 40 84 19 00 ou via contact@optimussolutions.com.';
    this.messages.push({role:'bot', text:reply});
    this.loading = false;
    this.$nextTick(() => { const el = this.$refs.msgs; if(el) el.scrollTop = el.scrollHeight; });
  }
}" class="fixed right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)] flex flex-col items-end" style="bottom: calc(1.25rem + env(safe-area-inset-bottom, 0px))">

  <div x-show="open" x-cloak
       x-transition:enter="transition duration-300" x-transition:enter-start="opacity-0 translate-y-4 scale-95"
       x-transition:leave="transition duration-200" x-transition:leave-end="opacity-0 translate-y-4 scale-95"
       class="mb-4 w-[calc(100vw-2rem)] max-w-[380px] sm:max-w-[420px] max-h-[75vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col">
    <div class="shrink-0 bg-primary p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-accent/20 rounded-full flex items-center justify-center"><span class="text-accent font-bold text-sm">O+</span></div>
        <div><p class="text-white text-sm font-semibold">Assistant Optimus+</p><p class="text-white/50 text-xs">En ligne</p></div>
      </div>
      <button @click="open=false" class="text-white/60 hover:text-white">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div x-ref="msgs" class="flex-1 min-h-[35vh] max-h-72 overflow-y-auto p-4 space-y-3 chatbot-messages">
      <template x-for="(m,i) in messages" :key="i">
        <div :class="m.role==='user' ? 'flex justify-end' : 'flex justify-start'">
          <div :class="m.role==='user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'"
               class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm" x-text="m.text"></div>
        </div>
      </template>
      <div x-show="loading" class="flex justify-start">
        <div class="bg-muted px-4 py-3 rounded-2xl flex gap-1">
          <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay:0ms"></span>
          <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay:150ms"></span>
          <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" style="animation-delay:300ms"></span>
        </div>
      </div>
    </div>
    {{-- Suggestions (visibles tant que l'utilisateur n'a pas encore posé de question) --}}
    <div x-show="messages.length <= 1" class="shrink-0 px-4 py-3 border-t border-border bg-muted/40">
      <p class="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2.5">Questions fréquentes</p>
      <div class="flex flex-wrap gap-2">
        <template x-for="q in ['Quels sont vos services ?','Comment vous contacter ?','🛒 Voir la boutique','Demander un devis','Où êtes-vous situés ?']">
          <button @click="input = q.slice(3); send()" x-text="q"
                  class="px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-colors cursor-pointer whitespace-nowrap"></button>
        </template>
      </div>
    </div>
    <div class="shrink-0 p-4 border-t border-border flex gap-2">
      <input x-model="input" @keydown.enter="send()" type="text" placeholder="Posez votre question..."
             class="flex-1 min-w-0 px-3 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/50">
      <button @click="send()" class="shrink-0 px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
      </button>
    </div>
  </div>

  <button @click="open=!open"
          class="w-16 h-16 sm:w-20 sm:h-20 bg-primary hover:bg-primary/90 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ring-4 ring-primary/20">
    <svg x-show="!open" class="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
    <svg x-show="open" x-cloak class="w-7 h-7 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  </button>
</div>

{{-- ── DRAWER LATÉRAL ANIMÉ ─────────────────────────────────────────────────── --}}
<div x-data="{ open: false }" class="fixed left-0 top-1/2 -translate-y-1/2 z-40">
  <div x-show="open" x-cloak @click.outside="open=false"
       x-transition:enter="transition duration-300 ease-out" x-transition:enter-start="-translate-x-full opacity-0"
       x-transition:leave="transition duration-200 ease-in" x-transition:leave-end="-translate-x-full opacity-0"
       class="absolute left-0 top-1/2 -translate-y-1/2 w-64 max-w-[80vw] bg-card border border-border rounded-r-3xl shadow-2xl p-6">
    <button @click="open=false" class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
    <p class="text-xs font-semibold uppercase tracking-wider text-accent mb-4">Accès rapide</p>
    <div class="space-y-2.5">
      <a href="/boutique" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-foreground font-medium text-sm transition-colors">
        <svg class="w-5 h-5 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
        Boutique
      </a>
      <a href="#contact" @click="open=false" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted hover:bg-muted/70 text-foreground font-medium text-sm transition-colors">
        <svg class="w-5 h-5 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        Demander un devis
      </a>
      <a href="https://wa.me/2290140841900" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-foreground font-medium text-sm transition-colors">
        <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 shrink-0 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
    </div>
  </div>

  <button @click="open=!open"
          class="relative flex flex-col items-center gap-2 px-3 py-5 bg-primary text-white rounded-r-2xl shadow-xl hover:bg-primary/90 hover:pr-5 transition-all duration-300 tab-wiggle">
    <span class="absolute -right-1 -top-1 w-3 h-3 bg-accent rounded-full animate-ping"></span>
    <span class="absolute -right-1 -top-1 w-3 h-3 bg-accent rounded-full"></span>
    <svg class="w-5 h-5 transition-transform duration-300" :class="open ? '-rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    <span class="text-[10px] font-bold uppercase tracking-widest hidden sm:inline" style="writing-mode:vertical-rl">Menu</span>
  </button>
</div>

@endsection
