<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'category' => $this->faker->randomElement(['News', 'Tips', 'Events']),
            'image' => $this->faker->imageUrl(640, 480, 'blog', true),
            'writer' => $this->faker->name,
            'date' => $this->faker->date(),
            'description' => $this->faker->paragraph(5),
        ];
    }
}
