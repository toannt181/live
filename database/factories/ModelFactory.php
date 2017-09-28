<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\Admin::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'password' => $password ?: $password = bcrypt('1'),
        'remember_token' => str_random(10),
        'created_at' => $faker-> dateTimeBetween('-2 months', 'now')
    ];
});


$factory->define(App\Customer::class, function (Faker\Generator $faker) {

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->phoneNumber,
        'created_at' => $faker-> dateTimeBetween('-2 months', 'now')
    ];
});

$factory->define(App\Message::class, function (Faker\Generator $faker) {

    return [
        'room_id' => rand(1, 50),
        'sender_id' => rand(0, 50),
        'content' => $faker->paragraph(1),
        'created_at' => $faker-> dateTimeBetween('-2 months', 'now')
    ];
});

$factory->define(App\Room::class, function (Faker\Generator $faker) {

    return [
        'topic_id' => rand(1, 3),
        'status' => rand(1, 3),
        'assignee' => rand(0,10),
        'created_at' => $faker-> dateTimeBetween('-2 months', 'now')
    ];
});