<?php

namespace Database\Factories;

use App\Models\Matrimony;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MatrimonyFactory extends Factory
{
    protected $model = Matrimony::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'display_name' => $this->faker->name,
            'account_created_by' => $this->faker->randomElement(['Self', 'Family', 'Friend']),
            'birthdate' => $this->faker->date(),
            'gender' => $this->faker->randomElement(['Male', 'Female']),
            'ethnicity' => $this->faker->word,
            'religion' => $this->faker->word,
            'caste' => $this->faker->word,
            'height' => $this->faker->randomElement(['5ft 6in', '6ft', '5ft']),
            'civil_status' => $this->faker->randomElement(['Never Married', 'Divorced', 'Widowed']),
            'country_of_residence' => $this->faker->country,
            'state_district' => $this->faker->word,
            'city' => $this->faker->city,
            'visa_type' => $this->faker->word,
            'education_level' => $this->faker->randomElement(['Bachelor\'s Degree', 'Master\'s Degree', 'PhD']),
            'profession' => $this->faker->jobTitle,
            'drinking' => $this->faker->randomElement(['Yes', 'No']),
            'food_preference' => $this->faker->randomElement(['Vegetarian', 'Non-Vegetarian', 'Vegan']),
            'smoking' => $this->faker->randomElement(['Yes', 'No']),
            'package_number' => $this->faker->randomElement([1, 2, 3]),
            'boot_post' => $this->faker->randomElement([0, 1]),
        ];
    }
}
