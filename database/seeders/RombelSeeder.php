<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RombelSeeder extends Seeder
{
    public function run()
    {
        DB::table('rombel')->insert([
            ['nama_rombel' => 'A'],
            ['nama_rombel' => 'B'],
            ['nama_rombel' => 'C'],
            ['nama_rombel' => 'D'],
            ['nama_rombel' => 'E'],
        ]);
    }
}
