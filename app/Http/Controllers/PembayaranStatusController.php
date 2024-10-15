<?php

namespace App\Http\Controllers;

use App\Models\pembayaran_status;
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


class PembayaranStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{

    $histori = pembayaran_status::with(['siswa', 'siswa.jenjang', 'siswa.jenjang.harga'])->get();
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
    

    return Inertia::render('Pembayaran', [
        'histori' => $histori,
    ]);
}

public function getNota($id){
    $nota = HistoriTransaksi::where('id_pembayaran_status', $id)->first();
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

    
    $pembayaran = pembayaran_status::findOrFail($id);

    $siswa = $pembayaran->siswa;

    $jenjang = $siswa->jenjang;
    $kelas = $siswa->kelas;

    $harga = Harga::where('jenjang_id', $jenjang->id)->first();

    if (!$harga) {
        return redirect()->back()->withErrors('Harga SPP tidak ditemukan untuk jenjang ini.');
    }
    $tgl_pembayaran = Carbon::now();
    $id_pembayaran_status = $id;
    $spp = $harga->spp;
    $diskon = $siswa->diskon;
    $nominal = $spp - $diskon;
    $deskripsi = "SPP " . $jenjang->nama_jenjang . " " . $kelas->nama_kelas;

    

    DB::table('histori_transaksi')->insert([
        'tgl_pembayaran' => $tgl_pembayaran,
        'id_pembayaran_status' => $id_pembayaran_status,
        'nominal' => $nominal,
        'deskripsi' => $deskripsi,
        'created_at' => now(),
        'updated_at' => now(),
    ]);
    $pembayaran->status = $request->status;
    $pembayaran->save();

    return redirect()->back()->with('message', 'Data Berhasil Disimpan');
}


    

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\pembayaran_status  $pembayaran_status
     * @return \Illuminate\Http\Response
     */
    public function show(pembayaran_status $pembayaran_status)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\pembayaran_status  $pembayaran_status
     * @return \Illuminate\Http\Response
     */
    public function edit(pembayaran_status $pembayaran_status)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\pembayaran_status  $pembayaran_status
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, pembayaran_status $pembayaran_status)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\pembayaran_status  $pembayaran_status
     * @return \Illuminate\Http\Response
     */
    public function destroy(pembayaran_status $pembayaran_status)
    {
        //
    }
}
