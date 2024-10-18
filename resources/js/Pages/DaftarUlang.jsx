import React, { useState } from 'react';
import CashierLayout from '@/Layouts/CashierLayout';
import Search from '@/Components/DaftarUlang/Search';
import Table from '@/Components/DaftarUlang/Table';

export default function DaftarUlang({ tagihan }) {
    const [filteredtagihan, setFilteredtagihan] = useState([]);
    const [selectedtagihan, setSelectedtagihan] = useState([]);

    const handleSearch = (searchTerm) => {
        const filtered = tagihan.filter(item =>
            item.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const uniqueSiswa = Array.from(new Set(filtered.map(item => item.siswa.nama)))
            .map(nama => filtered.find(item => item.siswa.nama === nama));

        setFilteredtagihan(uniqueSiswa);
    };

    const handleSelect = (namaSiswa) => {
        const selected = tagihan.filter(item => item.siswa.nama === namaSiswa);
        setSelectedtagihan(selected);
        setFilteredtagihan([]);
    };

    return (
        <CashierLayout>
            <div className="flex items-center justify-between my-4 w-full">
                <div className=''>
                    <h1 className="text-black font-semibold text-3xl">Pembayaran Daftar Ulang</h1>
                </div>
                <div className="">
                    <Search onSearch={handleSearch} />
                </div>
            </div>

            <div className="rounded-md shadow w-full bg-white my-3 p-5">
                <h1 className="text-black font-semibold text-xl mb-4">Data Siswa</h1>

                {filteredtagihan.length > 0 && (
                    <div className="relative">
                        <ul className="border border-gray-300 rounded-md shadow-lg bg-white absolute w-full max-h-60 overflow-y-auto z-10">
                            {filteredtagihan.map((item) => (
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

                {selectedtagihan.length > 0 && (
                    <div className="flex justify-between my-12">
                        <Table data={selectedtagihan} />
                    </div>
                )}
            </div>
        </CashierLayout>
    );
}
