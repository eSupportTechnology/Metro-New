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
        'education_level',
        'profession',
        'drinking',
        'food_preference',
        'smoking',
    ];

    /**
     * Get the user that owns the matrimony profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the father details associated with the matrimony profile.
     */
    public function father(): HasOne
    {
        return $this->hasOne(Father::class, 'user_id', 'user_id');
    }

    /**
     * Get the mother details associated with the matrimony profile.
     */
    public function mother(): HasOne
    {
        return $this->hasOne(Mother::class, 'user_id', 'user_id');
    }

    /**
     * Get the horoscope details associated with the matrimony profile.
     */
    public function horoscopeDetail(): HasOne
    {
        return $this->hasOne(HoroscopeDetail::class, 'user_id', 'user_id');
    }

    /**
     * Get the picture associated with the matrimony profile.
     */
    public function picture(): HasOne
    {
        return $this->hasOne(Picture::class, 'user_id', 'user_id');
    }
}
