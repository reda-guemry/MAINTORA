<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MaintenanceTaskMail extends Mailable
{
    use Queueable, SerializesModels;

    
    public function __construct(
        public int $taskId,
        public string $taskName,
        public string $status,
        public string $recipientEmail,
    ) {
    }


    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Maintenance Task Update - ' . ucfirst($this->status),
            from: new Address(config('mail.from.address'), config('mail.from.name')),
        );
    }


    public function content(): Content
    {
        return new Content(
            view: 'emails.maintenance-task',
            with: [
                'taskId' => $this->taskId,
                'taskName' => $this->taskName,
                'status' => $this->status,
            ],
        );
    }


    
    public function attachments(): array
    {
        return [];
    }
}
