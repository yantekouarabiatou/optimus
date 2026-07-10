@component('mail::message')
# Nouvelle demande de frais de transport

**{{ $demande->user->full_name }}** a soumis une nouvelle demande de remboursement de frais de transport.

@component('mail::table')
| | |
|:---|---:|
| Trajet | {{ $demande->lieu_depart }} → {{ $demande->lieu_arrivee }} |
| Date du déplacement | {{ $demande->date_deplacement->format('d/m/Y') }} |
| Moyen de transport | {{ $demande->moyen_transport }} |
| Motif | {{ $demande->motif }} |
| Coût estimé | {{ number_format($demande->cout_estime, 0, ',', ' ') }} FCFA |
@if ($demande->commentaire)
| Commentaire | {{ $demande->commentaire }} |
@endif
@endcomponent

@component('mail::button', ['url' => route('validation.index')])
Voir la demande
@endcomponent

Cordialement,<br>
{{ config('app.name') }}
@endcomponent
