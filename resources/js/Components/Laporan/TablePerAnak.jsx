import React, { useState, useEffect } from 'react';

export default function TablePerAnak({ siswa, data = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSiswa, setFilteredSiswa] = useState([]);
    const [selectedSiswa, setSelectedSiswa] = useState(null);

    const formatRupiah = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    // Fungsi untuk menangani perubahan input
    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // Filter siswa berdasarkan nama
        const filtered = siswa.filter((item) =>
            item.nama.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredSiswa(filtered);
    };

    // Fungsi untuk menangani pemilihan siswa dari saran
    const handleSiswaSelect = (siswa) => {
        setSelectedSiswa(siswa);
        setSearchTerm(siswa.nama); // Set input text dengan nama yang dipilih
        setFilteredSiswa([]); // Kosongkan saran
    };

    // Data yang ditampilkan di tabel
    const displayData = selectedSiswa ? data.filter(item => item.siswa.id === selectedSiswa.id) : [];

    // Effect untuk me-reset selectedSiswa ketika searchTerm berubah
    useEffect(() => {
        if (searchTerm === '') {
            setSelectedSiswa(null);
        }
    }, [searchTerm]);
    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Cari nama siswa..."
                    className="w-full p-2 border rounded"
                />
                {filteredSiswa.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded mt-1">
                        {filteredSiswa.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleSiswaSelect(item)}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                            >
                                {item.nama}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedSiswa && (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">No</th>
                            <th className="border p-2">Nama Siswa</th>
                            <th className="border p-2">Keterangan</th>
                            <th className="border p-2">Debit</th>
                            <th className="border p-2">Kredit</th>
                            <th className="border p-2">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.map((item, index) => {
                           const debit = item.jenis_transaksi === 'debit' ? parseFloat(item.nominal) : 0;
                           const kredit = item.jenis_transaksi === 'kredit' ? parseFloat(item.nominal) : 0;
                            return(
                            <tr key={index}>
                                <td className="border p-2">{item.tgl_pembayaran}</td>
                                <td className="border p-2">{item.siswa.nama}</td>
                                <td className="border p-2">{item.deskripsi}</td>
                                <td className="border p-2 text-right">{formatRupiah(debit)}</td>
                                <td className="border p-2 text-right">{formatRupiah(kredit)}</td>
                                <td className="border p-2">{item.saldo}</td>
                            </tr>
                            );
                    })}
                    </tbody>
                </table>
            )}
        </div>
    );
}