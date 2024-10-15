<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class TahunAjarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i<5; $i++){

        
        $mulai = Carbon::createFromDate(2024 + $i, 7, 1); 
        $akhir = Carbon::createFromDate(2025 + $i, 6, 30);

        // Periode diambil dari tahun 'mulai'
        $periode = $mulai->year . '/' . $akhir->year;

        // Insert ke dalam tabel tahun_ajar
        DB::table('tahun_ajar')->insert([
            'mulai' => $mulai,
            'akhir' => $akhir,
            'periode' => $periode,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}

    
}
