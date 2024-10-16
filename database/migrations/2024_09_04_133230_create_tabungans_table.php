<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
{
    Schema::create('tabungan', function (Blueprint $table) {
        $table->id();
        $table->foreignId('siswa_id')->constrained('siswa')->onDelete('cascade');
        $table->decimal('nominal',15,2);
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tabungan');
    }
};
