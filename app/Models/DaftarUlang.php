<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Siswa;

class DaftarUlang extends Model
{
    use HasFactory;
    protected $table = 'daftar_ulang';
    protected $guarded = [];

    public function siswa(){
        return $this->belongsTo(siswa::class);
    }
}
