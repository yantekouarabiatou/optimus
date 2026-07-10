<?php

namespace App\Mail;

use App\Models\DemandeTransport;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DemandeTransportTraitee extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public DemandeTransport $demande)
    {
    }

    public function envelope(): Envelope
    {
        $statut = $this->demande->statut === DemandeTransport::STATUT_VALIDEE ? 'validée' : 'rejetée';

        return new Envelope(
            subject: "Votre demande de transport a été {$statut}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.demande-transport-traitee',
            with: ['demande' => $this->demande],
        );
    }
}
