<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('harga')->insert([
            ['jenjang_id' => 1, 'spp' => 50000, 'daftar_ulang' => 50000],
            ['jenjang_id' => 2, 'spp' => 100000,'daftar_ulang' => 50000],
            ['jenjang_id' => 3, 'spp' => 150000,'daftar_ulang' => 50000],
            ['jenjang_id' => 4, 'spp' => 150000,'daftar_ulang' => 50000],
        ]);
        
    }
}
