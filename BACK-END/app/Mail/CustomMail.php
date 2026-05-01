<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;




class CustomMail extends Mailable 
{
    use Queueable, SerializesModels;

    public function __construct(
        public $data,
        public $subjectText , 
        public $content , 
        public ?string $viewName = null , 
    ){}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->subjectText,
        );
    }

    public function content(): Content
    {
        if ($this->viewName) {
            return new Content(
                view: $this->viewName,
                with: array_merge($this->data, [
                    'content' => $this->content
                ])
            );
        }

        return new Content(
            htmlString: $this->content
        );
    }
}




