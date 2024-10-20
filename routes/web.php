<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\IndexController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\HargaController;
use App\Http\Controllers\TabunganController;
use App\Http\Controllers\SppController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\DaftarUlangController;
use App\Http\Controllers\TagihanController;
use App\Http\Controllers\CalonSiswaController;
use App\Http\Controllers\PengaturanController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

    Route::get('/', [IndexController::class, 'index']);
    Route::get('/tabungan', [TabunganController::class, 'index']);
    Route::get('/tabungan/histori/{id}', [TabunganController::class, 'show']);
    Route::get('/daftar-ulang', [DaftarUlangController::class, 'index']);
    Route::get('/harga', [HargaController::class,'index']);
    Route::get('/laporan', [LaporanController::class,'index']);
    Route::get('/spp',[SppController::class, 'index']);
    Route::get('/nota/{id}',[SppController::class, 'getNota']);
    Route::get('/siswa', [SiswaController::class, 'index']);
    Route::get('/tagihan/{id}', [TagihanController::class, 'index']);
    Route::get('/calon-siswa', [CalonSiswaController::class, 'index']);
    Route::get('/pengaturan', [PengaturanController::class, 'index']);

    Route::post('/spp/{id}',[SppController::class, 'store']);
    Route::post('/laporan',[LaporanController::class, 'store']);
    Route::post('/siswa', [SiswaController::class, 'store']);
    Route::post('/daftar-ulang/{id}', [DaftarUlangController::class, 'store']);
    Route::post('/calon-siswa/tambah', [CalonSiswaController::class, 'store']);

    Route::put('/siswa/{id}', [SiswaController::class, 'update']);
    Route::put('/harga/{id}', [HargaController::class, 'update'])->name('harga.update');

    Route::delete('/siswa/{id}', [SiswaController::class, 'destroy']);
    Route::delete('/tabungan/{id}', [TabunganController::class, 'destroy']);
    


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
