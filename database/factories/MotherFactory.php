<?php

namespace Database\Factories;

use App\Models\Mother;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MotherFactory extends Factory
{
    protected $model = Mother::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'ethnicity' => $this->faker->word,
            'religion' => $this->faker->word,
            'caste' => $this->faker->word,
            'country_of_residence' => $this->faker->country,
            'profession' => $this->faker->jobTitle,
            'additional_info' => $this->faker->sentence,
        ];
    }
}
