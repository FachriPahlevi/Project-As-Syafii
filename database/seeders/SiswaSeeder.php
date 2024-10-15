<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('siswa')->insert([
            [
                'nama' => 'Ali Mahmud',
                'tgl_lahir' => '2010-05-21',
                'alamat' => 'Jl. Merdeka No. 45, Jakarta',
                'domisili' => 'Jakarta',
                'ibu' => 'Fatimah',
                'ayah' => 'Ahmad',
                'status_pembayaran' => 'Lunas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Siti Aminah',
                'tgl_lahir' => '2008-09-13',
                'alamat' => 'Jl. Kenanga No. 12, Bandung',
                'domisili' => 'Bandung',
                'ibu' => 'Zainab',
                'ayah' => 'Mustafa',
                'status_pembayaran' => 'Tidak Lunas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Budi Santoso',
                'tgl_lahir' => '2012-03-15',
                'alamat' => 'Jl. Sudirman No. 89, Surabaya',
                'domisili' => 'Surabaya',
                'ibu' => 'Sri Wahyuni',
                'ayah' => 'Haryanto',
                'status_pembayaran' => 'Lunas',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
