<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Kelas;
use App\Models\Jenjang;
use App\Models\Rombel;
use Illuminate\Support\Facades\Validator;



class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $siswa = Siswa::with(['jenjang', 'kelas', 'rombel'])->get();
        return Inertia::render('Siswa', [
            'siswa' => $siswa
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
        $validated = $request->validate([
            'nisn' => 'nullable|string|max:255',
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|max:255',
            'jenjang_id' => 'required|integer',
            'kelas_id' => 'required|integer',
            'rombel_id' => 'required|integer',
            'nama_ayah' => 'nullable|string|max:255',
            'nama_ibu' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'domisili' => 'nullable|string|max:255',
            'awal_masuk' => 'required|date',
        ]);

        Siswa::create($validated);

        return redirect()->back()->with('message', "Data Berhasil Tersimpan");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function show(Siswa $siswa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function edit(Siswa $siswa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Siswa $siswa, $id)
    {
         // Validasi input
         $validator = Validator::make($request->all(), [
            'nisn' => 'string|nullable|max:20',
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|max:20',
            'jenjang_id' => 'required|integer',
            'kelas_id' => 'required|integer',
            'rombel_id' => 'required|integer',
            'nama_ayah' => 'nullable|string|max:255',
            'nama_ibu' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'domisili' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->all()  // Menampilkan semua pesan kesalahan
            ], 422);
        }

        // Temukan siswa berdasarkan ID
        $siswa = Siswa::find($id);

        if (!$siswa) {
            return response()->json([
                'success' => false,
                'message' => 'Siswa dengan ID ' . $id . ' tidak ditemukan'
            ], 404);
        }

        try {
            // Perbarui data siswa
            $siswa->update($request->all());

            return response()->json([
                'success' => true,
                'message' => 'Data siswa berhasil diperbarui',
                'data' => $siswa
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat memperbarui data: ' . $e->getMessage()
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
{

    $siswa = Siswa::find($id);
    $siswa->delete();
    return redirect()->back();
    }


}
