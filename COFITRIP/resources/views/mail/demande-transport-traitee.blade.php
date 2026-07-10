@component('mail::message')
# Demande {{ $demande->statut === 'validee' ? 'validée' : 'rejetée' }}

Bonjour {{ $demande->user->prenom }},

Votre demande de remboursement de frais de transport a été
**{{ $demande->statut === 'validee' ? 'validée' : 'rejetée' }}** par la Direction Générale.

@component('mail::table')
| | |
|:---|---:|
| Trajet | {{ $demande->lieu_depart }} → {{ $demande->lieu_arrivee }} |
| Date du déplacement | {{ $demande->date_deplacement->format('d/m/Y') }} |
| Coût estimé | {{ number_format($demande->cout_estime, 0, ',', ' ') }} FCFA |
@if ($demande->statut === 'rejetee' && $demande->motif_rejet)
| Motif du rejet | {{ $demande->motif_rejet }} |
@endif
@endcomponent

@component('mail::button', ['url' => route('dashboard')])
Voir mes demandes
@endcomponent

Cordialement,<br>
{{ config('app.name') }}
@endcomponent
