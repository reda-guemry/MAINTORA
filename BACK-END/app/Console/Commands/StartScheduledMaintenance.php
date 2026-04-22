<?php

namespace App\Console\Commands;

use App\Services\Machine\StartScheduledMaintenanceService;
use Exception;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Log;

#[Signature('app:start-scheduled-maintenance')]
#[Description('Command description')]
class StartScheduledMaintenance extends Command
{

    function __construct(
        private StartScheduledMaintenanceService $startScheduledMaintenanceService
    ){parent::__construct();}

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            Log::info('Starting scheduled maintenance tasks.');
            $this->startScheduledMaintenanceService->startScheduledMaintenance();

        }catch (Exception $e) {
            $this->error('An error occurred while starting scheduled maintenance: ' . $e->getMessage());
            return self::FAILURE;
        }
    }
}
