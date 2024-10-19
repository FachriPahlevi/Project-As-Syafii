import React, { useState } from 'react';
import axios from 'axios';

export default function Table({ formData = [] }) {
    const [loading, setLoading] = useState(false);

    if (!formData.length) {
        return <p>Data siswa tidak tersedia.</p>;
    }

    const handleAddAllStudents = async () => {
        setLoading(true); // Tampilkan loading
        try {
            // Log data siswa ke console
            console.log('Data siswa yang akan ditambahkan:', formData);

            const students = formData.map(item => ({
                form_value: JSON.stringify(item.form_value) // Convert form_value to string
            }));

            console.table(students); // Log data dalam format tabel agar lebih mudah dibaca di console

            // Kirim data ke backend
            const response = await axios.post('/calon-siswa/tambah', { students });

            alert(response.data.message); // Tampilkan pesan sukses
            window.location.reload(); // Muat ulang halaman
        } catch (error) {
            console.error('Terjadi kesalahan:', error);
            alert('Gagal menambahkan siswa. ' + (error.response?.data.message || '')); // Tampilkan pesan error yang lebih rinci
        } finally {
            setLoading(false); // Matikan loading
        }
    };

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Daftar Siswa</h2>
                <button 
                    onClick={handleAddAllStudents}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    disabled={loading} // Disable tombol jika sedang loading
                >
                    {loading ? 'Menambah...' : 'Tambah Semua Siswa'}
                </button>
            </div>
            <table className="min-w-full table-auto text-left text-sm">
                <thead className="bg-gray-50">
                    <tr className="text-md font-semibold text-gray-700 uppercase">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">NIK</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-4">Alamat</th>
                        <th className="py-3 px-4">Domisili</th>
                        <th className="py-3 px-4">Ayah</th>
                        <th className="py-3 px-4">Ibu</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {formData.map((item, index) => {
                        const formValue = item.form_value; // Mengakses form_value yang terdecode

                        return (
                            <tr key={item.form_id} className="hover:bg-gray-100">
                                <td className="py-4 px-4 font-medium">{index + 1}</td>
                                <td className="py-4 px-4">{formValue['nik']}</td>
                                <td className="py-4 px-4">{formValue['nama-lengkap']}</td>
                                <td className="py-4 px-4">{formValue['alamat-asal']}</td>
                                <td className="py-4 px-4">{formValue['alamat-domisili']}</td>
                                <td className="py-4 px-4">{formValue['nama-ayah']}</td>
                                <td className="py-4 px-4">{formValue['nama-ibu']}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
