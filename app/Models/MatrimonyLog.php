<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MatrimonyLog extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'matrimony_logs';

    protected $fillable = [
        'matrimony_id',
        'description',
    ];

    public function matrimony()
    {
        return $this->belongsTo(Matrimony::class);
    }
}
