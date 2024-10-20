<?php

namespace App\Http\Controllers;

use App\Models\DaftarUlang;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\Harga;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DaftarUlangController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tagihan = DaftarUlang::with(['siswa', 'siswa.jenjang', 'siswa.jenjang.harga'])->get();
        $tagihan = $tagihan->map(function($item){

            $siswa = $item->siswa;
            $jenjang = $siswa->jenjang;
            $harga = Harga::where('jenjang_id', $jenjang->id)->first();
            $nominalDaftarUlang = $harga->daftar_ulang;

            $item->nominal = $nominalDaftarUlang;
            return $item;
        });
        return Inertia::render('DaftarUlang', [
            'tagihan' => $tagihan
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $Validated = $request->validate([
            'status' => 'required|in:Lunas,Belum Lunas',
        ]);

        $pembayaran = DaftarUlang::findOrFail($id);
        $siswa = $pembayaran->siswa;
        $siswa_id = $siswa->id;

        $jenjang = $siswa->jenjang;
        $kelas = $siswa->kelas;
        
        $tgl_pembayaran = Carbon::now();
        $daftar_ulang = $id;

        $harga = Harga::where('jenjang_id', $jenjang->id)->first();
        $nominal = $harga->daftar_ulang; 
        $deskripsi = "Daftar Ulang " . $jenjang->nama_jenjang . " " . $kelas->nama_kelas;
        

        DB::table('histori_transaksi')->insert([
            'tgl_pembayaran' => $tgl_pembayaran,
            'id_siswa' => $siswa_id,
            'nominal' => $nominal,
            'deskripsi' => $deskripsi,
            'kategori' => 'Daftar Ulang',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DaftarUlang  $daftarUlang
     * @return \Illuminate\Http\Response
     */
    public function show(DaftarUlang $daftarUlang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DaftarUlang  $daftarUlang
     * @return \Illuminate\Http\Response
     */
    public function edit(DaftarUlang $daftarUlang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\DaftarUlang  $daftarUlang
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DaftarUlang $daftarUlang)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DaftarUlang  $daftarUlang
     * @return \Illuminate\Http\Response
     */
    public function destroy(DaftarUlang $daftarUlang)
    {
        //
    }
}
