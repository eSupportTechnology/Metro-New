<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class HoroscopeDetail extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'horoscope_details';

    protected $fillable = [
        'user_id',
        'birthdate',
        'birth_country',
        'horoscope_matching_required',
        'birth_city',
        'birth_time',
    ];
}
