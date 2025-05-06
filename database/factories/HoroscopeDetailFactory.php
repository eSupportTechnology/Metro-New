<?php

namespace Database\Factories;

use App\Models\HoroscopeDetail;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class HoroscopeDetailFactory extends Factory
{
    protected $model = HoroscopeDetail::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'birthdate' => $this->faker->date(),
            'birth_country' => $this->faker->country,
            'horoscope_matching_required' => $this->faker->boolean(),
            'birth_city' => $this->faker->city,
            'birth_time' => $this->faker->time(),
        ];
    }
}
