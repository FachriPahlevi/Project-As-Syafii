<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KelasSeeder extends Seeder
{
    public function run()
    {
        DB::table('kelas')->insert([
            ['nama_kelas' => 'Kelas 1'],
            ['nama_kelas' => 'Kelas 2'],
            ['nama_kelas' => 'Kelas 3'],
            ['nama_kelas' => 'Kelas 4'],
            ['nama_kelas' => 'Kelas 5'],
            ['nama_kelas' => 'Kelas 6'],
        ]);
    }
}
