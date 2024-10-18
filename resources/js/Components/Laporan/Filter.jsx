import React, { useState } from 'react';

export default function Filter({ onFilter, siswa }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [namaSiswa, setNamaSiswa] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedJenjang, setSelectedJenjang] = useState('');

    const handleFilter = () => {
        if (onFilter) {
            const filters = { startDate, endDate, category, namaSiswa, jenjang: selectedJenjang, kelas: selectedKelas };
            onFilter(filters);
        }
    };

    const handleKelasChange = (event) => {
        setSelectedKelas(event.target.value);
    };

    const handleJenjangChange = (event) => {
        setSelectedJenjang(event.target.value);
    };

    const handleNamaSiswaChange = (event) => {
        setNamaSiswa(event.target.value);
        setSearchTerm(event.target.value); // Update searchTerm saat input berubah
    };

    const filteredSiswa = siswa.filter((item) => {
        const matchSearch = (item.nama?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.nama_ayah?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.nisn?.startsWith(searchTerm) || false);

        const matchJenjang = selectedJenjang ? (item.jenjang?.nama_jenjang?.toLowerCase() || '') === selectedJenjang.toLowerCase() : true;
        const matchKelas = selectedKelas ? (item.kelas?.nama_kelas?.toLowerCase() || '') === selectedKelas.toLowerCase() : true;

        return matchSearch && matchJenjang && matchKelas;
    });

    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-semibold mb-4">Filter Laporan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="mulai-tanggal">Mulai Tanggal</label>
                    <input
                        type="date"
                        id="mulai-tanggal"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="akhir-tanggal">Akhir Tanggal</label>
                    <input
                        type="date"
                        id="akhir-tanggal"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="kategori">Kategori Laporan</label>
                    <select
                        id="kategori"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        <option value="">Pilih Laporan</option>
                        <option value="Yayasan">Laporan Yayasan</option>
                        <option value="Perkelas">Laporan Perkelas</option>
                        <option value="PerAnak">Laporan PerAnak</option>
                    </select>
                </div>
            </div>

            {/* Form input tambahan berdasarkan kategori */}
            {category === 'PerAnak' && (
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="nama-siswa">Nama Siswa</label>
                    <input
                        type="text"
                        value={namaSiswa}
                        onChange={handleNamaSiswaChange}
                        placeholder="Cari nama siswa"
                        className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    {searchTerm && filteredSiswa.length > 0 && ( // Tampilkan saran jika ada input
                        <ul className="border border-gray-300 rounded-md mt-2 max-h-48 overflow-y-auto">
                            {filteredSiswa.map((s, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-blue-100 cursor-pointer"
                                    onClick={() => {
                                        setNamaSiswa(s.nama); // Set nama siswa yang dipilih
                                        setSearchTerm(''); // Kosongkan search term
                                    }}
                                >
                                    {s.nama}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {category === 'Perkelas' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="jenjang">Jenjang</label>
                        <select
                            className="w-full md:w-full rounded-md bg-white border hover:border-blue-300 border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={selectedJenjang}
                            onChange={handleJenjangChange}
                        >
                            <option value="">Pilih Jenjang</option>
                            <option value="paud">PAUD</option>
                            <option value="tk">TK</option>
                            <option value="sd">SD</option>
                            <option value="smp">SMP</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="kelas">Kelas</label>
                        <select
                            className="w-full md:w-full rounded-md bg-white hover:border-blue-300 border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={selectedKelas}
                            onChange={handleKelasChange}
                        >
                            <option value="">Pilih Kelas</option>
                            <option value="kelas 1">1</option>
                            <option value="kelas 2">2</option>
                            <option value="kelas 3">3</option>
                            <option value="kelas 4">4</option>
                            <option value="kelas 5">5</option>
                            <option value="kelas 6">6</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="mt-6 text-right">
                <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    onClick={handleFilter}
                >
                    Tampilkan
                </button>
            </div>
        </div>
    );
}
