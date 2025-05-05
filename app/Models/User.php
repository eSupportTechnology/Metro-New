<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Sanctum\PersonalAccessToken;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasUuids, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'role_as',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public function personalAccessTokens(): MorphMany
    {
        return $this->morphMany(PersonalAccessToken::class, 'tokenable');
    }

    /**
     * Get the matrimony profile associated with the user.
     */
    public function matrimony(): HasOne
    {
        return $this->hasOne(Matrimony::class);
    }

    /**
     * Get the father details associated with the user.
     */
    public function father(): HasOne
    {
        return $this->hasOne(Father::class);
    }

    /**
     * Get the mother details associated with the user.
     */
    public function mother(): HasOne
    {
        return $this->hasOne(Mother::class);
    }

    /**
     * Get the horoscope details associated with the user.
     */
    public function horoscopeDetail(): HasOne
    {
        return $this->hasOne(HoroscopeDetail::class);
    }

    /**
     * Get the picture associated with the user.
     */
    public function picture(): HasOne
    {
        return $this->hasOne(Picture::class);
    }
}
