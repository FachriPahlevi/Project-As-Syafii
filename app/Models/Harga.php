<?php

namespace App\Models;

use App\Models\Jenjang;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Harga extends Model
{
    use HasFactory;
    protected $table = 'harga';
    protected $guard = [];

    public function jenjang(){
        return $this->belongsTo(Jenjang::class);
    }
}
