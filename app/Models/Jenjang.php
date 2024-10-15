<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Harga;
class Jenjang extends Model
{
    use HasFactory;

    protected $table = 'jenjang';
    protected $guarded= [];

    public function harga(){
        return $this->belongsTo(Harga::class);
    }
}
