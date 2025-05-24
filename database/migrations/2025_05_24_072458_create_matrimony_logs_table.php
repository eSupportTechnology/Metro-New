<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matrimony_logs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('matrimony_id');
            $table->text('description');
            $table->timestamps();

            $table->foreign('matrimony_id')->references('id')->on('matrimonies')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matrimony_logs');
    }
};
