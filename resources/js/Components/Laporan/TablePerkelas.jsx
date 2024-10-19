import React, { useState } from 'react';

export default function TablePerkelas({ data = [] }) {
    const [kelas, setKelas] = useState('');
    const [jenjang, setJenjang] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = () => {
        // Pastikan input kelas dan jenjang tidak kosong
        if (!kelas || !jenjang) {
            alert('Silakan pilih Jenjang dan Kelas terlebih dahulu');
            return;
        }

        // Filter data sesuai dengan input jenjang dan kelas (case-insensitive comparison)
        const filtered = data.filter(item => 
            item.spp.siswa.kelas.id === parseInt(kelas, 10) && 
            item.spp.siswa.jenjang.id === parseInt(jenjang, 10)
        );

        setFilteredData(filtered);
        console.log(filtered);
    };

    console.log('Kelas:', kelas);
    console.log('Jenjang:', jenjang);

    return (
        <div className="p-6 w-full mt-5 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="jenjang">Jenjang</label>
                    <select
                        id="jenjang"
                        value={jenjang}
                        onChange={(e) => setJenjang(e.target.value)}
                        className="w-full rounded-md bg-white border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Pilih Jenjang</option>
                        <option value="1">PAUD</option>
                        <option value="2">TK</option>
                        <option value="3">SD</option>
                        <option value="4">SMP</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="kelas">Kelas</label>
                    <select
                        id="kelas"
                        value={kelas}
                        onChange={(e) => setKelas(e.target.value)}
                        className="w-full rounded-md bg-white border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500"
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
            </div>

            <div className="mt-4">
                <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={handleFilter}
                >
                    Tampilkan
                </button>
            </div>

            {/* Hanya tampilkan tabel jika data hasil filter tersedia */}
            {filteredData.length > 0 ? (
                <div className="mt-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                                <th className="border p-2">No</th>
                                <th className="border p-2">Kelas</th>
                                <th className="border p-2">Debit</th>
                                <th className="border p-2">Kredit</th>
                                <th className="border p-2">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{item.kelas}</td>
                                    <td className="border p-2 text-right">{item.debit}</td>
                                    <td className="border p-2 text-right">{item.kredit}</td>
                                    <td className="border p-2 text-right">{item.saldo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mt-4 text-red-500">Data tidak ditemukan. Silakan periksa Jenjang dan Kelas.</div>
            )}
        </div>
    );
}
