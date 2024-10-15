import React from 'react';

export default function Table({ tabungan = [] }) {
    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
        }).format(amount);
    };

    return (
        <div className="overflow-x-auto">
            <div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto bg-white">
                    <thead className="bg-gray-50">
                        <tr className="text-left text-gray-700 font-semibold text-sm uppercase tracking-wider">
                            <th className="px-6 py-4 border-b">#</th>
                            <th className="px-6 py-4 border-b">Nama</th>
                            <th className="px-6 py-4 border-b">Kelas</th>
                            <th className="px-6 py-4 border-b">Saldo</th>
                            <th className="px-6 py-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabungan.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 border-b text-gray-700">{index + 1}</td>
                                <td className="px-6 py-4 border-b text-gray-700">{item.siswa.nama}</td>
                                <td className="px-6 py-4 border-b text-gray-700">
                                    {item.siswa.kelas.nama_kelas} {item.siswa.rombel.nama_rombel}
                                </td>
                                <td className="px-6 py-4 border-b text-gray-700">{formatRupiah(item.nominal)}</td>
                                <td className="px-6 py-4 border-b text-gray-700">
                                    <div className="flex space-x-2">
                                        <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition-all duration-200">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4"></path></svg>
                                            Histori Transaksi
                                        </button>
                                        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all duration-200">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v8m4-4H8"></path></svg>
                                            Setor Tunai
                                        </button>
                                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all duration-200">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                            Tarik Tunai
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
