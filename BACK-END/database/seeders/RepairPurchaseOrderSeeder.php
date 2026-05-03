<?php

namespace Database\Seeders;

use App\Models\RepairPurchaseOrder;
use App\Models\RepairRequest;
use App\Models\User;
use Illuminate\Database\Seeder;


class RepairPurchaseOrderSeeder extends Seeder
{

    public function run(): void
    {
        $repairRequests = RepairRequest::where('status', '!=', 'rejected')->get();
        $admins = User::role('admin')->get();

        if ($repairRequests->isEmpty()) {
            $this->command->warn('No repair requests found.');
            return;
        }

        $purchaseOrderCount = 0;

        foreach ($repairRequests as $request) {
            // 50% of repair requests get purchase orders
            if (rand(1, 100) <= 50) {
                // Each request can have 1-2 purchase orders
                $ordersPerRequest = rand(1, 2);

                for ($i = 0; $i < $ordersPerRequest; $i++) {
                    RepairPurchaseOrder::create([
                        'repair_request_id' => $request->id,
                        'uploaded_by' => $admins->random()->id,
                        'file_path' => 'purchases/' . $this->generateFileName(),
                        'original_file_name' => $this->generateFileName(),
                        'status' => $this->randomOrderStatus(),
                    ]);
                    $purchaseOrderCount++;
                }
            }
        }

        $this->command->info("Created {$purchaseOrderCount} purchase orders");
    }


    private function generateFileName(): string
    {
        $timestamp = now()->format('Y-m-d-His');
        return "PO-{$timestamp}-" . strtoupper(substr(md5(uniqid()), 0, 6)) . ".pdf";
    }

    private function randomOrderStatus(): string
    {
        $statuses = ['uploaded', 'approved', 'rejected'];
        return $statuses[array_rand($statuses)];
    }
}
