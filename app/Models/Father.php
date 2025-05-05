<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Father extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'fathers';

    protected $fillable = [
        'user_id',
        'ethnicity',
        'religion',
        'caste',
        'country_of_residence',
        'profession',
        'additional_info',
    ];

    /**
     * Get the user that owns the father details.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
