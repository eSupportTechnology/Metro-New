<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class NicDetail extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'nic_details';

    protected $fillable = [
        'user_id',
        'nic_number',
        'nic_front_image',
        'nic_back_image',
    ];

    protected $casts = [
        'id' => 'string',
        'user_id' => 'string',
    ];

    protected $appends = [
        'nic_front_image_url',
        'nic_back_image_url'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getNicFrontImageUrlAttribute(): ?string
    {
        if ($this->nic_front_image && Storage::disk('public')->exists($this->nic_front_image)) {
            return asset('storage/' . $this->nic_front_image);
        }
        return null;
    }

    public function getNicBackImageUrlAttribute(): ?string
    {
        if ($this->nic_back_image && Storage::disk('public')->exists($this->nic_back_image)) {
            return asset('storage/' . $this->nic_back_image);
        }
        return null;
    }

    public function scopeByNicNumber($query, $nicNumber)
    {
        return $query->where('nic_number', $nicNumber);
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($nicDetail) {
            if ($nicDetail->nic_front_image && Storage::disk('public')->exists($nicDetail->nic_front_image)) {
                Storage::disk('public')->delete($nicDetail->nic_front_image);
            }
            if ($nicDetail->nic_back_image && Storage::disk('public')->exists($nicDetail->nic_back_image)) {
                Storage::disk('public')->delete($nicDetail->nic_back_image);
            }
        });

        static::updating(function ($nicDetail) {
            $original = $nicDetail->getOriginal();

            if ($original['nic_front_image'] &&
                $original['nic_front_image'] !== $nicDetail->nic_front_image &&
                Storage::disk('public')->exists($original['nic_front_image'])) {
                Storage::disk('public')->delete($original['nic_front_image']);
            }

            if ($original['nic_back_image'] &&
                $original['nic_back_image'] !== $nicDetail->nic_back_image &&
                Storage::disk('public')->exists($original['nic_back_image'])) {
                Storage::disk('public')->delete($original['nic_back_image']);
            }
        });
    }
}
