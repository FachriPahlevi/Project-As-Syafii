<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Siswa;

class spp extends Model
{
    use HasFactory;

    protected $table = 'spp';
    protected $guarded = [];

    public function siswa(){
        return $this->belongsTo(Siswa::class, 'siswa_id');
    }
    
}
