<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>@yield('title', 'Optimus+ Solutions | Partenaire Tech en Afrique')</title>
  <meta name="description" content="@yield('description', 'OPTIMUS+ SOLUTIONS SARL — Solutions IT, IA, Cybersécurité, Énergie solaire, Design web et Formation digitale au Bénin.')">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="/logo.jpg" type="image/jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  @vite(['resources/css/app.css', 'resources/js/app.js'])
  @stack('head')
</head>
<body class="font-sans antialiased bg-background text-foreground" x-data>
  @yield('content')
</body>
</html>
