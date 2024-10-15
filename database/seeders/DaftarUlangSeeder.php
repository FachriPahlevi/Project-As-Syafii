<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Siswa;

class DaftarUlangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
    $siswa = DB::table('siswa')->pluck('id');
    
    $now = Carbon::now();
    $year = $now->year;

    foreach ($siswa as $siswa_id) {
        // Data untuk bulan Januari
        $date_start = Carbon::createFromDate($year, 1, 1);
        DB::table('daftar_ulang')->insert([
            'siswa_id' => $siswa_id,
            'status' => 'Belum Lunas',
            'month' => $date_start->month, // Bulan 1
            'year' => $date_start->year, // Tahun saat ini
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        // Data untuk bulan Juni
        $date_end = Carbon::createFromDate($year, 6, 1); // Bulan 6
        DB::table('daftar_ulang')->insert([
            'siswa_id' => $siswa_id,
            'status' => 'Belum Lunas',
            'month' => $date_end->month,
            'year' => $date_end->year,
            'created_at' => $now,
            'updated_at' => $now,
        ]);
    }
}

}
