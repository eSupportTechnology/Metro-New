<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('nic_details', function (Blueprint $table) {
            $table->boolean('is_verified')->default(0)->after('nic_back_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('nic_details', function (Blueprint $table) {
            $table->dropColumn(['is_verified']);
        });
    }
};
