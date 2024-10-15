<?php

namespace App\Http\Controllers;

use App\Models\Harga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;

class HargaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $spp = Harga::with(['jenjang'])->get();
        return Inertia::render('SPP', [
            'harga' => $harga,
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
     * @param  \App\Models\SPP  $sPP
     * @return \Illuminate\Http\Response
     */
    public function show(SPP $sPP)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SPP  $sPP
     * @return \Illuminate\Http\Response
     */
    public function edit(SPP $sPP)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SPP  $sPP
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SPP $harga, $id)
    {
        $request->validate([
            'nominal' => 'required|numeric',
        ]);

        $harga = Harga::findOrFail($id);
        $harga->nominal = $request->input('nominal');
        $harga->save();

        return redirect()->back()->with('success', 'Nominal updated successfully.');
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SPP  $sPP
     * @return \Illuminate\Http\Response
     */
    public function destroy(SPP $sPP)
    {
        //
    }
}
