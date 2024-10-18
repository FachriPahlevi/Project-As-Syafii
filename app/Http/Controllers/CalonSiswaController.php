<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Siswa;

class CalonSiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
{
    // Fetch data from WordPress API
    $response = Http::get('https://al-hikmahsby.sch.id/wp-json/myapi/v1/pretty-forms/');

    // Handle if request fails
    if ($response->failed()) {
        return Inertia::render('CalonSiswa', [
            'error' => 'Failed to fetch data from API.'
        ]);
    }

    // Decode form_value JSON for each form entry
    $data = $response->json();
    $decodedData = array_map(function ($item) {
        $item['form_value'] = json_decode($item['form_value'], true); // Decode the form_value JSON string
        return $item;
    }, $data);

    // Return data to the Inertia React component
    return Inertia::render('CalonSiswa', [
        'formData' => $decodedData
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
         // Validasi data yang dikirim
         $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:siswa,nik',
            'alamat' => 'nullable|string',
            'domisili' => 'nullable|string',
            'nama_ayah' => 'nullable|string',
            'nama_ibu' => 'nullable|string',
            'awal_masuk' => 'required|date',
            // Tambahkan validasi lainnya sesuai kebutuhan
        ]);

        // Simpan data ke database
        $siswa = Siswa::create([
            'nama' => $validated['nama'],
            'nik' => $validated['nik'],
            'alamat' => $validated['alamat'],
            'domisili' => $validated['domisili'],
            'nama_ayah' => $validated['nama_ayah'],
            'nama_ibu' => $validated['nama_ibu'],
            'awal_masuk' => $validated['awal_masuk'],
            // Tambahkan data lainnya sesuai dengan schema
        ]);

        // Kembalikan response sukses
        return response()->json(['message' => 'Siswa berhasil ditambahkan.'], 201);
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
