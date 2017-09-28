<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'name' => "TEKO ADMIN",
            'email' => 'super',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 1
        ]);

        DB::table('admins')->insert([
            'name' => "TEKO",
            'email' => 'teko',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 0
        ]);

        DB::table('admins')->insert([
            'name' => "VM TUAN",
            'email' => 'tuan',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 0
        ]);

        DB::table('admins')->insert([
            'name' => "NGUYEN T TOAN",
            'email' => 'toan',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 0
        ]);

        DB::table('admins')->insert([
            'name' => "NGUYEN DUC THUAN",
            'email' => 'thuan',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 0
        ]);

        DB::table('admins')->insert([
            'name' => "DO QUOC VUONG",
            'email' => 'vuong',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 1
        ]);

        DB::table('admins')->insert([
            'name' => "DO TRAN LINH",
            'email' => 'linh',
            'phone' => '0123456789',
            'password' => bcrypt('1'),
            'remember_token' => str_random(10),
            'is_super' => 1
        ]);
//        DB::table('topics')->insert([
//            'name' => "Sale",
//        ]);
//        DB::table('topics')->insert([
//            'name' => "Other",
//        ]);
//        factory(App\Message::class, 10000)->create()->make();
//        factory(App\Customer::class, 500)->create()->make();
//        factory(App\Room::class, 200)->create()->make();
    }
}
