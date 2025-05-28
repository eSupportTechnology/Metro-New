<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\MatrimonyLog;

class DeactivateOldMatrimonyProfiles extends Command
{
    protected $signature = 'matrimony:deactivate-old';
    protected $description = 'Deactivate matrimony profiles based on package expiry and log changes';

    public function handle()
    {
        $now = Carbon::now();

        $packageRules = [
            1 => 30,
            2 => 90,
            3 => 90,
        ];

        foreach ($packageRules as $packageNumber => $days) {
            $thresholdDate = $now->copy()->subDays($days);

            $profiles = DB::table('matrimonies')
                ->where('package_number', $packageNumber)
                ->where('created_at', '<=', $thresholdDate)
                ->where('is_active', 1)
                ->get(['id', 'created_at']);

            foreach ($profiles as $profile) {
                DB::table('matrimonies')
                    ->where('id', $profile->id)
                    ->update(['is_active' => 0]);

                $description = "Profile deactivated automatically due to package {$packageNumber} expiration after {$days} days. Created at: {$profile->created_at}.";

                MatrimonyLog::create([
                    'matrimony_id' => $profile->id,
                    'description' => $description,
                ]);
            }

            $this->info("Processed package {$packageNumber} expiration, deactivated: " . count($profiles));
        }
    }
}
