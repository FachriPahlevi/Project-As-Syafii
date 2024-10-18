<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Siswa;
use App\Models\spp;
use App\Models\Tabungan;
use App\Models\kelas;
use App\Models\HistoriTransaksi;


class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{

    $totalSiswa = Siswa::count();
    $tabungan = Tabungan::all();
    $totalTabungan = Tabungan::sum('nominal'); 

    $now = carbon::now();
    $currentMonth = $now->format('F');
    $currentYear = $now->year;

    $pembayaranStatus = spp::with(['siswa.kelas','siswa.jenjang','siswa.rombel'])
    ->where('month', $currentMonth)
    ->where('year', $currentYear)
    ->get();

    $jenjang = Siswa::select('jenjang_id', \DB::raw('count(*) as total'))
            ->with('jenjang')
            ->groupBy('jenjang_id')
            ->get();

    $lunas = spp::where('status', 'Belum Lunas')
    ->where('month', $currentMonth)
    ->count();

    $histori = HistoriTransaksi::all();

    return Inertia::render('Index', [
        'totalSiswa' => $totalSiswa,
        'totalTabungan' => $totalTabungan,
        'pembayaranStatus'=> $pembayaranStatus,
        'jenjang' => $jenjang,
        'lunas' => $lunas,
        'histori' => $histori
    ]);
}

    public function handleUpdateAjaran(){
        $pembayaranStatus = spp::with(['siswa'])->get();

        
        return Inertia::render('Index', [
            'totalSiswa' => $totalSiswa,
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
        
    }
}
