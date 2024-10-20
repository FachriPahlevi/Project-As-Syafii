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
        Schema::create('histori_transaksi', function (Blueprint $table) {
            $table->id();
            $table->date('tgl_pembayaran');
            $table->foreignId('id_siswa')->nullable()->constrained('siswa')->onUpdate('cascade')->onDelete('cascade');
            $table->decimal('nominal', 15, 2);
            $table->string('deskripsi');
            $table->enum('kategori', ['SPP', 'Daftar Ulang', 'Tabungan', 'Lainnya'])->default('Lainnya');
            $table->enum('jenis_transaksi', ['debit', 'kredit'])->default('debit');
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
        Schema::dropIfExists('histori_transaksi');
    }
};
