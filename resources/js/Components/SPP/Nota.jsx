import React from 'react';

export default function Nota({ selectedPayment, printNota, closeModal, nota }) {
    if (!selectedPayment) {
        return null; 
    }
    const monthToString = (month) => {
        const months = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return months[month - 1];
    };
    
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="nota bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <style>{`
                    @media print {
                        @page {
                            size: 10.5cm 21cm;
                            margin: 0;
                        }
                        body {
                            margin: 0;
                        }
                        .fixed {
                            position: static !important;
                            background: none !important;
                            opacity: 1 !important;
                        }
                        .shadow-lg {
                            box-shadow: none !important;
                        }
                        button {
                            display: none;
                        }
                        body * {
                            visibility: hidden;
                        }
                        .nota, .nota * {
                            visibility: visible;
                        }
                        .nota {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 21cm;
                            height: 10.5cm;
                            padding: 1cm;
                            margin: auto;
                        }
                    }
                `}</style>

                <div className="flex items-center justify-between mb-6">
                    <img 
                        src='img/logo.png'
                        className="h-16 w-16"
                        alt="Logo Yayasan As-Syafi'iyah"
                    />
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-gray-800">YAYASAN AS-SYAFI'IYAH</h2>
                        <p className="text-sm text-gray-600">Jl. Rejosari Pesantren III No.17,</p>
                        <p className="text-sm text-gray-600">Benowo, Pakal, Surabaya 60195</p>
                        <p className="text-sm text-gray-600">Telp: 7409622</p>
                    </div>
                </div>

                <div className="border-t-2 border-b-2 border-gray-200 py-4 mb-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800">BUKTI PEMBAYARAN SPP</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Nama Siswa</p>
                        <p className="text-lg font-medium">{selectedPayment.siswa?.nama}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">NISN</p>
                        <p className="text-lg font-medium">{selectedPayment.siswa?.nisn}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Tanggal Pembayaran</p>
                        <p className="text-lg font-medium">{nota.tgl_pembayaran}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600">Periode</p>
                        <p className="text-lg font-medium">{monthToString(selectedPayment.month)} {selectedPayment.year}</p>
                    </div>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-700">Total Pembayaran</p>
                        <p className="text-2xl font-bold text-green-600">
                            {selectedPayment.nominal
                                ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(nota.nominal)
                                : 'Nominal tidak tersedia'}
                        </p>
                    </div>
                    <p className="text-right text-sm font-medium text-gray-600 mt-2">Status: {selectedPayment.status}</p>
                </div>

                <div className="text-center text-gray-600 mb-6">
                    <p className="font-medium">Terima kasih atas pembayaran Anda</p>
                    <p className="text-sm">Simpan bukti pembayaran ini sebagai referensi</p>
                </div>

                <div className="flex justify-end gap-4">
                    <button onClick={printNota} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                        Cetak
                    </button>
                    <button onClick={closeModal} className="px-4 py-2 text-white bg-red-700 rounded-lg hover:bg-red-400 transition duration-300">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}