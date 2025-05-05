<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birthdate' => 'date',
        'horoscope_matching_required' => 'boolean',
    ];

    /**
     * Get the user that owns the horoscope details.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
