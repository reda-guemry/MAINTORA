<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AnomalyMail extends Mailable
{
    use Queueable, SerializesModels;


    public function __construct(
        public int $anomalyId,
        public string $severity,
        public string $description,
        public string $recipientEmail,
    ) {
    }



    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Anomaly Alert - ' . strtoupper($this->severity),
            from: new Address(config('mail.from.address'), config('mail.from.name')),
        );
    }



    public function content(): Content
    {
        return new Content(
            view: 'emails.anomaly',
            with: [
                'anomalyId' => $this->anomalyId,
                'severity' => $this->severity,
                'description' => $this->description,
            ],
        );
    }

    
    public function attachments(): array
    {
        return [];
    }
}
