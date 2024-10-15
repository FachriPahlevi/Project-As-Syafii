import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function EditModal({ isOpen, onClose, siswa }) {
    const [formData, setFormData] = useState({
        nisn: '',
        nama: '',
        nik: '',
        jenjang_id: '',
        kelas_id: '',
        rombel_id: '',
        nama_ayah: '',
        nama_ibu: '',
        alamat: '',
        domisili: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (siswa) {
            setFormData({
                nisn: siswa.nisn,
                nama: siswa.nama,
                nik: siswa.nik,
                jenjang_id: siswa.jenjang_id,
                kelas_id: siswa.kelas_id,
                rombel_id: siswa.rombel_id,
                nama_ayah: siswa.nama_ayah,
                nama_ibu: siswa.nama_ibu,
                alamat: siswa.alamat,
                domisili: siswa.domisili
            });
        }
    }, [siswa]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`/siswa/${siswa.id}`, formData);
            await Swal.fire({
                title: 'Berhasil!',
                text: 'Data siswa berhasil diupdate!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                // Me-refresh halaman secara otomatis setelah penghapusan data
                onClose()
                window.location.reload();
            });
        } catch (error) {
            console.error('Error:', error);
            await Swal.fire({
                title: 'Error!',
                text: 'Terjadi kesalahan saat mengupdate data.',
                icon: 'error',
                confirmButtonText: 'OK'
                });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <dialog open className="modal screen">
            <div className="modal-box bg-white w-full">
                <h3 className="font-bold text-lg">Edit Data Siswa</h3>
                <form onSubmit={handleSubmit} className="py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nisn">NISN</label>
                            <input
                                type="text"
                                id="nisn"
                                name="nisn"
                                value={formData.nisn}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nama">Nama <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nik">NIK <span className='text-red-500'>*</span></label>
                            <input
                                type="text"
                                id="nik"
                                name="nik"
                                value={formData.nik}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="alamat">Alamat</label>
                            <textarea
                                id="alamat"
                                name="alamat"
                                value={formData.alamat}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="domisili">Domisili</label>
                            <textarea
                                id="domisili"
                                name="domisili"
                                value={formData.domisili}
                                onChange={handleChange}
                                className="textarea textarea-bordered w-full"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="jenjang_id">Jenjang <span className='text-red-500'>*</span></label>
                            <select
                                id="jenjang_id"
                                name="jenjang_id"
                                value={formData.jenjang_id}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            >
                                <option value="">Pilih Jenjang</option>
                                <option value="1">PAUD</option>
                                <option value="2">TK</option>
                                <option value="3">SD</option>
                                <option value="4">SMP</option>
                                {/* Tambahkan opsi jenjang lain sesuai kebutuhan */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="kelas_id">Kelas <span className='text-red-500'>*</span></label>
                            <select
                                id="kelas_id"
                                name="kelas_id"
                                value={formData.kelas_id}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            >
                                <option value="">Pilih Kelas</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="rombel_id">Rombel <span className='text-red-500'>*</span></label>
                            <select
                                id="rombel_id"
                                name="rombel_id"
                                value={formData.rombel_id}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                required
                            >
                                <option value="">Pilih Rombel</option>
                                <option value="1">A</option>
                                <option value="2">B</option>
                                <option value="3">C</option>
                                <option value="4">D</option>
                                <option value="5">E</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nama_ayah">Nama Ayah</label>
                            <input
                                type="text"
                                id="nama_ayah"
                                name="nama_ayah"
                                value={formData.nama_ayah}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1" htmlFor="nama_ibu">Nama Ibu</label>
                            <input
                                type="text"
                                id="nama_ibu"
                                name="nama_ibu"
                                value={formData.nama_ibu}
                                onChange={handleChange}
                                className="input input-bordered w-full"
                                
                            />
                        </div>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" onClick={onClose} className="btn">Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
