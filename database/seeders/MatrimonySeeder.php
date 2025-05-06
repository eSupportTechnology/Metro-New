<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Matrimony;

class MatrimonySeeder extends Seeder
{
    public function run(): void
    {
        Matrimony::factory(10)->create();
    }
}
