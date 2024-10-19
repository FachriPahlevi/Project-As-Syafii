<?php

namespace App\Http\Controllers;

use App\Models\Laporan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\HistoriTransaksi;
use App\Models\spp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $siswa = Siswa::all();
        $transaksi = HistoriTransaksi::with(['spp', 'spp.siswa', 'spp.siswa.jenjang', 'spp.siswa.kelas'])->get();
        return Inertia::render('Laporan',[
            'transaksi' => $transaksi,
            'siswa' => $siswa,
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
    public function store(Request $request)
{
    // Lakukan validasi input
    $validatedData = $request->validate([
        'tgl_pembayaran' => 'required|date',
        'nominal' => 'required|integer',
        'deskripsi' => 'required|string',
        'jenis_transaksi' => 'required|in:debit,kredit',
    ]);

    // Simpan data ke dalam tabel histori_transaksi
    HistoriTransaksi::create($validatedData);

    // Redirect kembali ke halaman sebelumnya dengan pesan sukses
    return redirect()->back()->with('message', 'Data Berhasil Ditambahkan');
}


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Laporan  $laporan
     * @return \Illuminate\Http\Response
     */
    public function show(Laporan $laporan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Laporan  $laporan
     * @return \Illuminate\Http\Response
     */
    public function edit(Laporan $laporan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Laporan  $laporan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Laporan $laporan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Laporan  $laporan
     * @return \Illuminate\Http\Response
     */
    public function destroy(Laporan $laporan)
    {
        //
    }
}
