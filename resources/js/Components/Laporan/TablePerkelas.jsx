import React, { useState } from 'react';

export default function TablePerkelas({ data = [] }) {
    const [kelas, setKelas] = useState('');
    const [jenjang, setJenjang] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const formatRupiah = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    const handleFilter = () => {
        if (!kelas || !jenjang) {
            alert('Silakan pilih Jenjang dan Kelas terlebih dahulu');
            return;
        }

        const filtered = data.filter(item => 
            item.siswa.kelas_id === parseInt(kelas, 10) && 
            item.siswa.jenjang_id === parseInt(jenjang, 10)
        );

        setFilteredData(filtered);
    };

    // Menghitung total debit dan kredit
    const totalDebit = filteredData.reduce((acc, item) => {
        return acc + (item.jenis_transaksi === 'debit' ? parseFloat(item.nominal) : 0);
    }, 0);

    const totalKredit = filteredData.reduce((acc, item) => {
        return acc + (item.jenis_transaksi === 'kredit' ? parseFloat(item.nominal) : 0);
    }, 0);

    // Menghitung saldo berjalan untuk setiap transaksi
    const dataWithRunningBalance = filteredData.map((item, index) => {
        let runningBalance = 0;
        // Hitung saldo dari awal sampai transaksi saat ini
        for (let i = 0; i <= index; i++) {
            const trx = filteredData[i];
            if (trx.jenis_transaksi === 'debit') {
                runningBalance += parseFloat(trx.nominal);
            } else {
                runningBalance -= parseFloat(trx.nominal);
            }
        }
        return { ...item, saldoAkumulatif: runningBalance };
    });

    // Total saldo akhir
    const totalSaldoAkhir = totalDebit - totalKredit;

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

            {dataWithRunningBalance.length > 0 ? (
                <div className="mt-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                                <th className="border p-2">Tanggal</th>
                                <th className="border p-2">Nama Siswa</th>
                                <th className="border p-2">Kelas</th>
                                <th className="border p-2">Keterangan</th>
                                <th className="border p-2">Debit</th>
                                <th className="border p-2">Kredit</th>
                                <th className="border p-2">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataWithRunningBalance.map((item, index) => {
                                const debit = item.jenis_transaksi === 'debit' ? parseFloat(item.nominal) : 0;
                                const kredit = item.jenis_transaksi === 'kredit' ? parseFloat(item.nominal) : 0;
                                return (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border p-2">{item.tgl_pembayaran}</td>
                                        <td className="border p-2">{item.siswa.nama}</td>
                                        <td className="border p-2">{item.siswa.jenjang.nama_jenjang} {item.siswa.kelas.nama_kelas}</td>
                                        <td className="border p-2">{item.deskripsi}</td>
                                        <td className="border p-2 text-right">{formatRupiah(debit)}</td>
                                        <td className="border p-2 text-right">{formatRupiah(kredit)}</td>
                                        <td className="border p-2 text-right">{formatRupiah(item.saldoAkumulatif)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold">
                                <td className="border p-2" colSpan="4">Total</td>
                                <td className="border p-2 text-right">{formatRupiah(totalDebit)}</td>
                                <td className="border p-2 text-right">{formatRupiah(totalKredit)}</td>
                                <td className="border p-2 text-right">{formatRupiah(totalSaldoAkhir)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="mt-4 text-red-500">Data tidak ditemukan. Silakan periksa Jenjang dan Kelas.</div>
            )}
        </div>
    );
}