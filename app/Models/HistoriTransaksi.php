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

    public function spp(){
       return $this->belongsTo(spp::class, 'id_spp');
    }

}
