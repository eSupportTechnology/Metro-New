<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\MatrimonyService;

class RandomBootPostUpdate extends Command
{
    protected $signature = 'matrimony:random-boot-post';
    protected $description = 'Randomly set boot_post=1 for a subset of matrimony profiles daily';

    protected MatrimonyService $service;

    public function __construct(MatrimonyService $service)
    {
        parent::__construct();
        $this->service = $service;
    }

    public function handle()
    {
        $packageNumbers = [1, 2, 3];
        $probability = 0.3;

        foreach ($packageNumbers as $packageNumber) {
            $this->service->randomlySetBootPosts($packageNumber, $probability);
            $this->info("Processed package {$packageNumber} with probability {$probability}");
        }
    }
}
