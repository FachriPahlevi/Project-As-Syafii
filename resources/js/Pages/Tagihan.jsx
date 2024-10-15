import React from 'react';
import CashierLayout from '@/Layouts/CashierLayout';

export default function Tagihan({ tagihan }) {
    const monthToString = (month) => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return months[month - 1];
    };

    // Fungsi untuk memformat angka menjadi Rupiah
    const formatRupiah = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    // Hitung total tagihan berdasarkan data yang ada
    const totalTagihan = tagihan.reduce((total, item) => {
        // Hanya hitung diskon untuk item SPP
        if (item.keterangan.toLowerCase() === 'spp') {
            const afterDiscount = item.total - (item.siswa.diskon || 0);
            return total + afterDiscount;
        }
        return total + item.total; // Untuk item selain SPP, jumlahkan totalnya tanpa diskon
    }, 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <CashierLayout>
            <div className="p-6 bg-white w-full">
                <style>{`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        .print-section, .print-section * {
                            visibility: visible;
                        }
                        .print-section {
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                `}</style>

                <div className="print-section">
                    {/* Header (Kop) */}
                    <div className="mb-6 border-b-2 border-gray-300 pb-4">
                        <div className="flex justify-between mx-3 w-full">
                            <div className="flex items-center w-full">
                                <img 
                                    src="/img/logo.png"
                                    alt="Logo Yayasan As-Syafi'iyah"
                                    className="h-16 w-16"
                                />
                                <div className="text-left ml-5 w-1/2">
                                    <h2 className="text-xl font-bold text-gray-800">YAYASAN AS-SYAFI'IYAH</h2>
                                    <p className="text-sm text-gray-600">Jl. Rejosari Pesantren III No.17, Benowo, Pakal, Surabaya 60195</p>
                                    <p className="text-sm text-gray-600">Telp: 7409622</p>
                                </div>
                            </div>
                            <div className="text-left w-1/2">
                                <h2 className="text-xl font-bold text-gray-800">Invoice</h2>
                                <p className="text-sm text-gray-600">Nomor</p>
                                <p className="text-sm text-gray-600">Tanggal</p>
                                <p className="text-sm text-gray-600">Deadline : 08/04/2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Informasi Siswa */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Nama Siswa</p>
                            <p className="text-lg font-medium">{tagihan[0]?.siswa?.nama || 'Nama Tidak Tersedia'}</p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <table className="w-full border-collapse border">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="border p-2">Keterangan</th>
                                <th className="border p-2">Nominal</th>
                                <th className="border p-2">Diskon</th>
                                <th className="border p-2">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tagihan.map((item, index) => (
                                <tr className="text-center" key={index}>
                                    <td className="border p-2">{item.keterangan} {monthToString(item.month)}</td>
                                    <td className="border p-2">{formatRupiah(item.total)}</td>
                                    <td className="border p-2">
                                        {item.keterangan.toLowerCase() === 'spp' ? 
                                            (item.siswa.diskon ? formatRupiah(item.siswa.diskon) : '-') : 
                                            '-'
                                        }
                                    </td>
                                    <td className="border p-2">
                                        {item.keterangan.toLowerCase() === 'spp' ? 
                                            formatRupiah(item.total - (item.siswa.diskon || 0)) : 
                                            formatRupiah(item.total)
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Footer Section */}
                    <div className="mt-4">
                        <p className="text-right font-bold">Total Tagihan: {formatRupiah(totalTagihan)}</p>
                    </div>
                </div>

                {/* Tombol Cetak */}
                <div className="flex justify-end mt-4 no-print">
                    <button
                        onClick={handlePrint}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Cetak Tagihan
                    </button>
                </div>
            </div>
        </CashierLayout>
    );
}
