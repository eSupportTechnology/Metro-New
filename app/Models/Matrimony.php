<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Matrimony extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'matrimonies';

    protected $fillable = [
        'user_id',
        'display_name',
        'account_created_by',
        'birthdate',
        'gender',
        'ethnicity',
        'religion',
        'caste',
        'height',
        'civil_status',
        'country_of_residence',
        'state_district',
        'city',
        'visa_type',
        'is_active',
        'education_level',
        'profession',
        'drinking',
        'food_preference',
        'religion_visible',
        'smoking',
        'package_number',
        'boot_post',
    ];
}
