<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Siswa;
use App\Models\pembayaran_status;
use App\Models\histori_transaksi;
use App\Models\DaftarUlang;
use App\Models\Harga;
use Illuminate\Support\Facades\DB;

class TagihanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $now = Carbon::now();
        $currentMonth = $now->month;
        $currentYear = $now->year;
    
        // Mengambil tagihan SPP
        $spp = pembayaran_status::with('siswa', 'siswa.jenjang')
            ->where('status', 'Belum Lunas')
            ->where(function($query) use ($currentMonth, $currentYear) {
                $query->where('year', $currentYear)
                      ->where('month', '<', $currentMonth)
                      ->orWhere('year', '<', $currentYear);
            })
            ->where('siswa_id', $id)
            ->select('*', DB::raw("'SPP' as keterangan")) // Menambahkan keterangan 'SPP'
            ->get();
    
        // Mengambil tagihan Daftar Ulang
        $daftarUlang = DaftarUlang::with('siswa', 'siswa.jenjang')
            ->where('status', 'Belum Lunas')
            ->where(function($query) use ($currentMonth, $currentYear) {
                $query->where('year', $currentYear)
                      ->where('month', '<', $currentMonth)
                      ->orWhere('year', '<', $currentYear);
            })
            ->where('siswa_id', $id)
            ->select('*', DB::raw("'Daftar Ulang' as keterangan")) // Menambahkan keterangan 'Daftar Ulang'
            ->get();
    
        // Menggabungkan tagihan SPP dan Daftar Ulang
        $tagihan = $spp->merge($daftarUlang);
    
        // Menambahkan harga dari jenjang untuk SPP dan Daftar Ulang, serta menghitung total SPP setelah diskon
        $tagihan = $tagihan->map(function($item) {
            $siswa = $item->siswa;
            $jenjang = $siswa->jenjang;
    
            // Ambil harga SPP dan Daftar Ulang berdasarkan jenjang
            $harga = Harga::where('jenjang_id', $jenjang->id)->first();
            
            // Cek jika tagihan adalah SPP atau Daftar Ulang
            if ($item->keterangan == 'SPP') {
                $item->harga = $harga ? $harga->spp : null; // Harga SPP
                $totalSpp = $harga ? $harga->spp - $siswa->diskon : null; // Total SPP setelah diskon
                $item->total = $totalSpp;
            } elseif ($item->keterangan == 'Daftar Ulang') {
                $item->harga = $harga ? $harga->daftar_ulang : null; // Harga Daftar Ulang
                $item->total = $item->harga; // Tidak ada diskon, jadi total sama dengan harga
            }
    
            return $item;
        });
        return Inertia::render('Tagihan', [
            'tagihan' => $tagihan,
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
