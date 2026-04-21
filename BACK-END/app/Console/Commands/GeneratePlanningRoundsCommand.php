<?php

namespace App\Console\Commands;

use App\Services\Rounde\GeneratePlanningService;
use Exception;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Log;

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
        } catch (Exception $e) {
            Log::error('Error generating planning rounds: ' . $e->getMessage());
            $this->error('An error occurred while generating planning rounds. Check logs for details.');
        }


    }
}
