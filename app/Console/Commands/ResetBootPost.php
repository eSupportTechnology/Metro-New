<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetBootPost extends Command
{
    protected $signature = 'matrimony:reset-boot-post';
    protected $description = 'Reset all boot_post fields to 0 before random boot_post runs';

    public function handle()
    {
        $updated = DB::table('matrimonies')->update(['boot_post' => 0]);
        $this->info("Reset boot_post to 0 for {$updated} matrimony profiles.");
    }
}
