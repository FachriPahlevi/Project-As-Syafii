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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->char('nisn', 10)->nullable();
            $table->char('nik', 16)->unique();
            $table->string('nama');
            $table->text('alamat')->nullable();
            $table->string('domisili')->nullable();
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->date('awal_masuk');
            $table->integer('diskon')->nullable();
            $table->foreignId('ajaran_id')->nullable()->constrained('tahun_ajar')->onDelete('set null');
            $table->foreignId('jenjang_id')->nullable()->constrained('jenjang')->onDelete('set null');
            $table->foreignId('kelas_id')->nullable()->constrained('kelas')->onDelete('set null');
            $table->foreignId('rombel_id')->nullable()->constrained('rombel')->onDelete('set null');
            $table->timestamps();
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';
        });
        
        
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('siswa');
    }
};
