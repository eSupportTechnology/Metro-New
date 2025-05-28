<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class CronTriggerController extends Controller
{
    public function runAllCommands()
    {
        Artisan::call('matrimony:reset-boot-post');
        Artisan::call('matrimony:random-boot-post');
        Artisan::call('matrimony:deactivate-old');

        return response()->json([
            'message' => 'All matrimony commands executed successfully.'
        ]);
    }
}
