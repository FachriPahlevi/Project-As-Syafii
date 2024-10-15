<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Siswa;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PembayaranStatusSeeder extends Seeder
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

        $year = 2024;

        foreach ($siswa as $siswa_id) {
            for ($i = 0; $i < 12; $i++) {
                $date = Carbon::createFromDate($year, 4, 1)->addMonths($i);

                DB::table('pembayaran_status')->insert([
                    'siswa_id' => $siswa_id,
                    'month' => $date->month,
                    'year' => $date->year,
                    'ajaran_id' => 1,
                    'status' => 'Belum Lunas',
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
