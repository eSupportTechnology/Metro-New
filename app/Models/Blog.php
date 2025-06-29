<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'blogs';

    protected $fillable = [
        'title',
        'category',
        'image',
        'writer',
        'date',
        'description',
    ];
}
