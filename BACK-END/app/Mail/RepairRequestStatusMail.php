<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RepairRequestStatusMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public int $repairRequestId,
        public string $status,
        public string $notes,
        public string $recipientEmail,
    ) {
    }


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Repair Request #' . $this->repairRequestId . ' Status Update',
            from: new Address(config('mail.from.address'), config('mail.from.name')),
        );
    }


    public function content(): Content
    {
        return new Content(
            view: 'emails.repair-request-status',
            with: [
                'repairRequestId' => $this->repairRequestId,
                'status' => $this->status,
                'notes' => $this->notes,
            ],
        );
    }

   
    public function attachments(): array
    {
        return [];
    }
}
