<?php

namespace App\Http\Controllers;

use App\Models\Tabungan;
use App\Models\Siswa;
use App\Models\Jenjang;
use App\Models\Kelas;
use App\Models\Rombel;
use Illuminate\Http\Request;
use Inertia\Inertia;
class TabunganController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{
    $tabungan = Tabungan::with([
        'siswa.rombel',
        'siswa.kelas',
        'siswa.jenjang'
    ])->get();

    
    return Inertia::render('Tabungan', [
        'tabungan' => $tabungan,
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
     * @param  \App\Models\tabungan  $tabungan
     * @return \Illuminate\Http\Response
     */
    public function show(tabungan $tabungan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\tabungan  $tabungan
     * @return \Illuminate\Http\Response
     */
    public function edit(tabungan $tabungan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\tabungan  $tabungan
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, tabungan $tabungan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\tabungan  $tabungan
     * @return \Illuminate\Http\Response
     */
    public function destroy(tabungan $tabungan, $id)
    {
        
    }
}
