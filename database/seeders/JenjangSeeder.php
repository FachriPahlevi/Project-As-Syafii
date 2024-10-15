<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenjangSeeder extends Seeder
{
    public function run()
    {
        DB::table('jenjang')->insert([
            ['nama_jenjang' => 'PAUD', 'periode' => 2],
            ['nama_jenjang' => 'TK', 'periode' => 2],
            ['nama_jenjang' => 'SD', 'periode' => 6],
            ['nama_jenjang' => 'SMP', 'periode' => 3],
        ]);
        
    }
}

