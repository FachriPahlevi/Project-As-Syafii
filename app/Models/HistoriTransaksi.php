<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\spp;
class HistoriTransaksi extends Model
{
    use HasFactory;
    protected $table = 'histori_transaksi';
    protected $guarded = [];

    public function siswa(){
       return $this->belongsTo(siswa::class, 'id_siswa');
    }

}
