import React, { useRef, useState } from 'react';
import axios from 'axios';

export default function Modal({ openModalRef }) {
    const modalRef = useRef(null);

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
        domisili: '',
        awal_masuk: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            await axios.post('/siswa', formData);
            setFormData({
                nisn: '',
                nama: '',
                nik: '',
                jenjang_id: '',
                kelas_id: '',
                rombel_id: '',
                nama_ayah: '',
                nama_ibu: '',
                alamat: '',
                domisili: '',
                awal_masuk: ''
            });

            // Tutup modal dan tampilkan SweetAlert setelah modal ditutup
            modalRef.current.close();
            setTimeout(async () => {
                await Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data siswa berhasil disimpan!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                window.location.reload(); // Muat ulang halaman jika perlu
            }, 300); // Waktu dalam milidetik untuk memberi waktu modal menutup

        } catch (error) {
            console.error('Error:', error);
            modalRef.current.close();
            setTimeout(async () => {
                await Swal.fire({
                    title: 'Terjadi Kesalahan!',
                    text: 'Terjadi kesalahan saat menyimpan data.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }, 300); // Waktu dalam milidetik untuk memberi waktu modal menutup
        } finally {
            setIsSubmitting(false);
        }
    };

    React.useEffect(() => {
        openModalRef.current = () => {
            modalRef.current.showModal();
        };
    }, [openModalRef]);

    return (
        <dialog ref={modalRef} className="modal screen">
            <div className="modal-box bg-white w-fit w-full">
                <h3 className="font-bold text-lg">Form Data Siswa</h3>
                <form onSubmit={handleSubmit} className="py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
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
                                <label className="block text-sm font-medium mb-1" htmlFor="awal_masuk">Awal Masuk <span className='text-red-500'>*</span></label>
                                <input
                                    type="date"
                                    id="awal_masuk"
                                    name="awal_masuk"
                                    value={formData.awal_masuk}
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
                        </div>
                        <div>
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
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <button type="button" onClick={() => modalRef.current.close()} className="btn">Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
