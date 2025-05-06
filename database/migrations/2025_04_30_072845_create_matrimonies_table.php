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
        Schema::create('matrimonies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained('users')->onDelete('cascade');
            $table->string('display_name');
            $table->string('account_created_by');
            $table->date('birthdate');
            $table->string('gender');
            $table->string('ethnicity');
            $table->string('religion');
            $table->string('caste')->nullable();
            $table->string('height')->nullable();
            $table->string('civil_status');
            $table->string('country_of_residence');
            $table->string('state_district');
            $table->string('city');
            $table->string('visa_type')->nullable();
            $table->string('education_level');
            $table->string('profession');
            $table->string('drinking')->nullable();
            $table->string('food_preference')->nullable();
            $table->string('smoking')->nullable();
            $table->integer('package_number')->default(1);
            $table->boolean('boot_post')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matrimonies');
    }
};
