<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Siswa;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;


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
    $now =Carbon::now();
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

    // Ambil data siswa dari permintaan
    $students = $request->input('students'); // Ambil data siswa dari input request


    // Pastikan ada data siswa yang diterima
    if (empty($students) || !is_array($students)) {
        return response()->json(['message' => 'Tidak ada data siswa yang diberikan.'], 400);
    }

    // Menginisialisasi array untuk menyimpan data yang akan disimpan
    $dataToStore = [];
    $storedNIKs = []; // Array untuk melacak NIK yang sudah diproses

    foreach ($students as $studentData) {
        // Memastikan bahwa form_value adalah string
        if (isset($studentData['form_value']) && is_string($studentData['form_value'])) {
            // Decode form_value
            $formValue = json_decode($studentData['form_value'], true); // Decode form_value JSON string

            // Pastikan hasil decode tidak null
            if (json_last_error() !== JSON_ERROR_NONE) {
                return response()->json(['message' => 'Data siswa tidak valid.'], 400);
            }

            // Pastikan data yang diperlukan tersedia
            if (!isset($formValue['nama-lengkap']) || !isset($formValue['nik']) || !isset($formValue['tgl-lahir'])) {
                return response()->json(['message' => 'Data siswa tidak lengkap.'], 400);
            }

            $nik = $formValue['nik']; // Ambil NIK

            // Cek apakah NIK sudah pernah diproses atau sudah ada di database
            if (in_array($nik, $storedNIKs) || Siswa::where('nik', $nik)->exists()) {
                continue; // Abaikan siswa dengan NIK yang sama
            }

            // Tambahkan NIK ke dalam array NIK yang sudah diproses
            $storedNIKs[] = $nik;

            // Ambil tanggal lahir dan format
            $tglLahir = Carbon::parse($formValue['tgl-lahir'])->format('Y-m-d'); // Format ke Y-m-d
            $awalMasuk = Carbon::now()->format('Y-m-d'); // Ambil tanggal sekarang untuk awal_masuk

            // Tambahkan data ke array yang akan disimpan
            $dataToStore[] = [
                'nama' => $formValue['nama-lengkap'] ?? null,
                'nik' => $nik,
                'alamat' => $formValue['alamat-asal'] ?? null,
                'domisili' => $formValue['alamat-domisili'] ?? null,
                'nama_ayah' => $formValue['nama-ayah'] ?? null,
                'nama_ibu' => $formValue['nama-ibu'] ?? null,
                'awal_masuk' => $awalMasuk,
                'tgl_lahir' => $tglLahir, // Simpan tanggal lahir yang sudah diformat
                'jenjang_id' => 4,
                'ajaran_id' => 1,
                'rombel_id' => 1,
                'kelas_id' => 1,
            ];
        } else {
            // Jika form_value bukan string, log kesalahan atau tangani sesuai kebutuhan
            return response()->json(['message' => 'Data siswa tidak valid.'], 400);
        }
    }
    // Simpan ke database jika tidak ada error
    foreach ($dataToStore as $data) {
        Siswa::create($data);
    }

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
