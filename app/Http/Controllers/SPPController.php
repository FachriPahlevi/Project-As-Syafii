<?php

namespace App\Http\Controllers;

use App\Models\spp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\Harga;
use App\Models\Jenjang;
use App\Models\kelas;
use App\Models\HistoriTransaksi;
use Illuminate\Support\Facades\Log;


class SPPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{

    $histori = spp::with(['siswa', 'siswa.jenjang', 'siswa.jenjang.harga'])->get();
    $histori = $histori->map(function($item) {

        $siswa = $item->siswa;
        $jenjang = $siswa->jenjang;
        $harga = Harga::where('jenjang_id', $jenjang->id)->first();
        $spp = $harga->spp;
        $diskon = $siswa->diskon;
        $nominalSPP = $spp - $diskon;
        
        $item->nominal = $nominalSPP;
        return $item;
    });
    

    return Inertia::render('Spp', [
        'histori' => $histori,
    ]);
}

public function getNota($id){
    $nota = HistoriTransaksi::where('id_spp', $id)->first();
    return response()->json($nota);
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
    $request->validate([
        'status' => 'required|in:Lunas,Belum Lunas',
    ]);

    
    $pembayaran = spp::findOrFail($id);

    $siswa = $pembayaran->siswa;
    $siswa_id = $siswa->id;
    $jenjang = $siswa->jenjang;
    $kelas = $siswa->kelas;

    $harga = Harga::where('jenjang_id', $jenjang->id)->first();

    if (!$harga) {
        return response()->json(['error' => 'Harga SPP tidak ditemukan untuk jenjang ini.'], 400);
    }
    $tgl_pembayaran = Carbon::now();
    $id_spp = $id;
    $spp = $harga->spp;
    $diskon = $siswa->diskon;
    $nominal = $spp - $diskon;
    $deskripsi = "SPP " . $jenjang->nama_jenjang . " " . $kelas->nama_kelas;

    

    DB::table('histori_transaksi')->insert([
        'tgl_pembayaran' => $tgl_pembayaran,
        'id_siswa' => $siswa_id,
        'nominal' => $nominal,
        'deskripsi' => $deskripsi,
        'kategori' => 'SPP',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    $pembayaran->status = $request->status;
    $pembayaran->save();

    return response()->json([
        'message' => 'Data Berhasil Disimpan',
        'status' => $pembayaran->status,
        'nominal' => $nominal,
        'deskripsi' => $deskripsi
    ]);
}


    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function show(spp $spp)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function edit(spp $spp)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, spp $spp)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function destroy(spp $spp)
    {
        //
    }
}
