<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mother extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'mothers';

    protected $fillable = [
        'user_id',
        'ethnicity',
        'religion',
        'caste',
        'country_of_residence',
        'profession',
        'additional_info',
    ];
}
