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
        Schema::table('matrimonies', function (Blueprint $table) {
            $table->boolean('religion_visible')->default(1)->after('religion')->comment('Whether religion field is visible (1: yes, 0: no)');
        });
    }

    public function down(): void
    {
        Schema::table('matrimonies', function (Blueprint $table) {
            $table->dropColumn('religion_visible');
        });
    }
};
