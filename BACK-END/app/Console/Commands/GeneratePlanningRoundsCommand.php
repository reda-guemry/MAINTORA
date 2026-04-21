<?php

namespace App\Console\Commands;

use App\Services\Rounde\GeneratePlanningService;
use Exception;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Log;
use Throwable;

#[Signature('app:generate-planning-rounds')]
#[Description('Generate future rounds for active maintenance plans')]
class GeneratePlanningRoundsCommand extends Command
{

    public function __construct(
        private GeneratePlanningService $generatePlanningService
    ) {
        parent::__construct();
    }



    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to generate planning rounds for active maintenance plans.');
        Log::info('Starting to generate planning rounds for active maintenance plans.');

        try {
            $this->generatePlanningService->generateRoundsForActivePlans();
            $this->info('Successfully generated planning rounds for active maintenance plans.');
            Log::info('Successfully generated planning rounds for active maintenance plans.');
        }catch (Throwable $e) {
            Log::error('Error generating planning rounds', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            $this->error('An error occurred while generating planning rounds. Check logs for details.');

            return self::FAILURE;
        }


    }
}
