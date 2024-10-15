<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Siswa;

class pembayaran_status extends Model
{
    use HasFactory;

    protected $table = 'pembayaran_status';
    protected $guarded = [];

    public function siswa(){
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }
    
}
