<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            JenjangSeeder::class,
            KelasSeeder::class,
            RombelSeeder::class,
            HargaSeeder::class,
            TahunAjarSeeder::class,
        ]);
    }
}
