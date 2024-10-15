<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\pembayaran_status;
class HistoriTransaksi extends Model
{
    use HasFactory;
    protected $table = 'histori_transaksi';
    protected $guarded = [];

    public function pembayaran_status(){
       return $this->belongsTo(pembayaran_status::class, 'id_pembayaran_status');
    }

}
