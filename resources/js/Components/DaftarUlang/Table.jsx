import React, { useState } from 'react';

import Nota from './Nota';


export default function Table({ data = [] }) {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const monthToString = (month) => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return months[month - 1];
    };

    const handlePayment = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Ingin melakukan pembayaran dan mengubah status menjadi Lunas?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Bayar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post(`/daftar-ulang/${id}`, { status: 'Lunas' });
                    Swal.fire(
                        'Berhasil!',
                        'Pembayaran telah berhasil, status telah diubah menjadi Lunas.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'Terjadi kesalahan saat melakukan pembayaran.',
                        'error'
                    );
                    console.error('Error during payment:', error);
                }
            }
        });
    };

    const handleViewNota = (payment) => {
        setSelectedPayment(payment); // Menyimpan data pembayaran yang dipilih
        setIsModalOpen(true); // Membuka modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Menutup modal
        
    };

    const printNota = () => {
        window.print(); // Fungsi untuk mencetak
    };

    return (
        <div className='w-full'>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="py-2 px-4 border-b">No</th>
                        <th className="py-2 px-4 border-b">Nama</th>
                        <th className="py-2 px-4 border-b">NISN</th>
                        <th className="py-2 px-4 border-b">Tahun</th>
                        <th className="py-2 px-4 border-b">Bulan</th>
                        <th className="py-2 px-4 border-b">Nominal</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{index + 1}</td>
                                <td className="py-2 px-4 border-b">{item.siswa?.nama || 'Nama tidak ditemukan'}</td>
                                <td className="py-2 px-4 border-b">{item.siswa?.nisn || 'NISN tidak ditemukan'}</td>
                                <td className="py-2 px-4 border-b">{item.year}</td>
                                <td className="py-2 px-4 border-b">{monthToString(item.month)}</td>
                                <td className="py-2 px-4 border-b">
                                    {item.nominal
                                        ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.nominal)
                                        : 'Nominal tidak tersedia'}
                                </td>

                                <td className={`py-2 px-4 border-b ${item.status === 'Lunas' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {item.status !== 'Lunas' ? (
                                        <button
                                            onClick={() => handlePayment(item.id)}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Bayar
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleViewNota(item)}
                                            className="btn btn-sm text-white btn-success"
                                        >
                                            Lihat
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="py-4 text-center text-gray-500">Tidak ada data siswa</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isModalOpen && (
                <Nota
                    selectedPayment={selectedPayment}
                    printNota={printNota}
                    closeModal={closeModal} 
                />
            )}
        </div>
    );
}
