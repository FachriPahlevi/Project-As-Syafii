import React, { useState } from 'react';

import CashierLayout from '@/Layouts/CashierLayout';
import Search from '@/Components/Spp/Search'
import Table from '@/Components/Spp/Table'

export default function Spp({ histori }) {
    const [filteredHistori, setFilteredHistori] = useState([]);
    const [selectedHistori, setSelectedHistori] = useState([]);

    const handleSearch = (searchTerm) => {
        const filtered = histori.filter(item =>
            item.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const uniqueSiswa = Array.from(new Set(filtered.map(item => item.siswa.nama)))
            .map(nama => filtered.find(item => item.siswa.nama === nama));

        setFilteredHistori(uniqueSiswa);
    };

    const handleSelect = (namaSiswa) => {
        const selected = histori.filter(item => item.siswa.nama === namaSiswa);
        setSelectedHistori(selected);
        setFilteredHistori([]);

    };

    const handleViewTagihan = () => {
        const siswaId = selectedHistori.length > 0 ? selectedHistori[0].siswa.id : '';
        window.location.href = `/tagihan/${siswaId}`;
    };


    return (
        <CashierLayout>
            <div className="flex items-center justify-between my-4 w-full">
                <div className=''>
                    <h1 className="text-black font-semibold text-3xl">Pembayaran SPP</h1>
                </div>
                <div className="">
                    <Search onSearch={handleSearch} />
                </div>
            </div>

            <div className="rounded-md shadow w-full bg-white p-5">
                <div className="flex justify-between">
                    <h1 className="text-black font-semibold text-xl mb-4 items-center">Data Siswa</h1>
                    <select
                            className="w-full md:w-48 rounded-md bg-white border  hover:border-blue-300 border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                            <option value="">Pilih Periode</option>
                            <option value="paud">2022/2023</option>
                            <option value="tk">2023/2024</option>
                            <option value="sd">2024/2025</option>
                            <option value="smp">2025/2026</option>
                        </select>
                </div>

                {filteredHistori.length > 0 && (
                    <div className="relative">
                        <ul className="border border-gray-300 rounded-md shadow-lg bg-white absolute w-full max-h-60 overflow-y-auto z-10">
                            {filteredHistori.map((item) => (
                                <li
                                    key={item.siswa.id}
                                    className="p-3 hover:bg-blue-100 cursor-pointer transition-colors duration-200"
                                    onClick={() => handleSelect(item.siswa.nama)}
                                >
                                    {item.siswa.nama}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedHistori.length > 0 && (
                    <div className="flex justify-between my-12">
                        <Table data={selectedHistori} />
                    </div>
                )}
                {selectedHistori.length > 0 && (
                        <button
                            onClick={handleViewTagihan}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Tagihan
                        </button>
                    )}
            </div>
        </CashierLayout>
    );
}
