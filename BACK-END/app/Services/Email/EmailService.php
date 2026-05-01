<?php

namespace App\Services\Email;

use App\Mail\AnomalyMail;
use App\Mail\CustomMail;
use App\Mail\RepairRequestMail;
use App\Mail\UserRegistrationMail;
use App\Mail\RepairRequestStatusMail;
use App\Mail\MaintenanceTaskMail;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;



class EmailService
{
    
    public function sendAnomalyNotification(int $anomalyId, string $severity, string $description, array $recipients = []): bool
    {
        try {
            foreach ($recipients as $email) {
                Mail::to($email)->queue(new AnomalyMail($anomalyId, $severity, $description, $email));
            }
            return true;
        } catch (Exception $e) {
            Log::error('Anomaly email notification failed: ' . $e->getMessage());
            return false;
        }
    }


    public function sendRepairRequestNotification(int $repairRequestId, string $status, array $recipients = []): bool
    {
        try {
            foreach ($recipients as $email) {
                Mail::to($email)->queue(new RepairRequestMail($repairRequestId, $status, $email));
            }
            return true;
        } catch (Exception $e) {
            Log::error('Repair request email notification failed: ' . $e->getMessage());
            return false;
        }
    }


    public function sendRegistrationEmail(User $user): bool
    {
        try {
            Mail::to($user->email)->queue(new UserRegistrationMail($user));
            return true;
        } catch (Exception $e) {
            Log::error('User registration email failed: ' . $e->getMessage());
            return false;
        }
    }

    public function sendRepairRequestStatusUpdate(int $repairRequestId, string $status, string $notes, string $recipientEmail): bool
    {
        try {
            Mail::to($recipientEmail)->queue(new RepairRequestStatusMail($repairRequestId, $status, $notes, $recipientEmail));
            return true;
        } catch (Exception $e) {
            Log::error('Repair request status update email failed: ' . $e->getMessage());
            return false;
        }
    }

    public function sendMaintenanceTaskNotification(int $taskId, string $taskName, string $status, array $recipients = []): bool
    {
        try {
            foreach ($recipients as $email) {
                Mail::to($email)->queue(new MaintenanceTaskMail($taskId, $taskName, $status, $email));
            }
            return true;
        } catch (Exception $e) {
            Log::error('Maintenance task email notification failed: ' . $e->getMessage());
            return false;
        }
    }

    public function sendCustomEmail($recipients, string $subject, string $content = '', ?string $templateView = null, array $templateData = []): bool
    {
        try {
            $recipientArray = is_array($recipients) ? $recipients : [$recipients];

        foreach ($recipientArray as $email) {
            Mail::to($email)->queue(
                new CustomMail(
                    subjectText: $subject,
                    content: $content,
                    viewName: $templateView,
                    data: $templateData
                )
            );
        }

            return true;
        } catch (Exception $e) {
            Log::error('Custom email sending failed: ' . $e->getMessage());
            return false;
        }
    }
}
