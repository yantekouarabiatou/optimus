<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connexion Admin | Optimus+ Solutions</title>
  <link rel="icon" href="/logo.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased min-h-screen relative flex items-center justify-center p-4">

  {{-- ── Image de fond ── --}}
  <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1920&q=80"
       alt="" class="absolute inset-0 w-full h-full object-cover">
  <div class="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

  {{-- ── Carte de connexion ── --}}
  <div class="relative w-full max-w-md z-10">

    {{-- Logo --}}
    <div class="text-center mb-8">
      <a href="/" class="inline-flex items-center gap-3 mb-4">
        <img src="/logo.jpg" alt="Optimus+" class="w-14 h-14 rounded-2xl object-cover shadow-2xl ring-2 ring-white/20">
        <div class="text-left">
          <div class="font-extrabold text-white text-2xl leading-none">OPTIMUS<span class="text-accent">+</span></div>
          <div class="text-white/50 text-xs tracking-widest uppercase mt-0.5">Solutions SARL</div>
        </div>
      </a>
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-full">
        <div class="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
        <span class="text-accent text-sm font-medium">Espace Administration</span>
      </div>
    </div>

    {{-- Erreur --}}
    @if($errors->any())
      <div class="mb-4 flex items-start gap-3 px-4 py-3.5 bg-red-500/20 border border-red-400/40 text-red-200 rounded-2xl text-sm backdrop-blur-sm">
        <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        <span>{{ $errors->first() }}</span>
      </div>
    @endif

    {{-- Formulaire --}}
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
      <div class="mb-7">
        <h1 class="text-2xl font-extrabold text-white">Connexion</h1>
        <p class="text-white/50 text-sm mt-1">Entrez vos identifiants pour accéder au tableau de bord.</p>
      </div>

      <form method="POST" action="{{ route('admin.login.post') }}" class="space-y-5">
        @csrf
        <div>
          <label class="block text-sm font-semibold text-white/80 mb-2">Adresse email</label>
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <input type="email" name="email" value="{{ old('email') }}" required autofocus
                   class="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 transition-all @error('email') border-red-400/60 @enderror"
                   placeholder="admin@optimussolutions.com">
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-white/80 mb-2">Mot de passe</label>
          <div class="relative" x-data="{ show: false }">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            <input :type="show ? 'text' : 'password'" name="password" required
                   class="w-full pl-11 pr-12 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 transition-all"
                   placeholder="••••••••">
            <button type="button" @click="show = !show"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors">
              <svg x-show="!show" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <svg x-show="show" x-cloak class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
            </button>
          </div>
        </div>

        <button type="submit"
                class="w-full flex items-center justify-center gap-2 py-4 bg-accent text-primary font-bold text-base rounded-xl hover:bg-accent/90 transition-all shadow-xl shadow-accent/30 mt-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/></svg>
          Se connecter
        </button>
      </form>
    </div>

    <p class="text-center text-sm text-white/30 mt-6">
      <a href="/" class="hover:text-white/60 transition-colors">← Retour au site public</a>
    </p>
  </div>

</body>
</html>
