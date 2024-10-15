<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Siswa;

class tabungan extends Model
{
    use HasFactory;
    protected $table = 'tabungan';
    protected $guarded = [];

    public function siswa(){
        return $this->belongsTo(Siswa::class);
    }
}
