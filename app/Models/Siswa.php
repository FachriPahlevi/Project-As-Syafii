<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Jenjang;
use App\Models\Kelas;
use App\Models\Rombel;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';
    protected $guarded= [];

    public function jenjang(){
        return $this->belongsTo(Jenjang::class);
    }

    public function kelas(){
        return $this->belongsTo(Kelas::class);
    }

    public function rombel(){
        return $this->belongsTo(Rombel::class);
    }
}
