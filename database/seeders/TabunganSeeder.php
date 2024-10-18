<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Siswa;

class TabunganSeeder extends Seeder
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

        foreach ($siswa as $siswa_id) {
                DB::table('tabungan')->insert([
                    'siswa_id' => $siswa_id,
                    'nominal' => 0,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
        }
    }
}
