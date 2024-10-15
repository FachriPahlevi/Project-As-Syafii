<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TabunganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tabungan')->insert([
            ['siswa_id' => 1, 'nominal'=> 250000],
            ['siswa_id' => 2, 'nominal'=> 250000],
            ['siswa_id' => 3, 'nominal'=> 250000],
            ['siswa_id' => 4, 'nominal'=> 250000],
            ['siswa_id' => 5, 'nominal'=> 250000],
            ['siswa_id' => 6, 'nominal'=> 250000],
        ]);
    }
}
