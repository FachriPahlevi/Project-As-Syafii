import React from 'react';

export default function Table({ data = [] }) {
    let totalDebit = 0;
    let totalKredit = 0;
    let saldoAkumulatif = 0;

    // Fungsi untuk format angka ke format Rupiah
    const formatRupiah = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    return (
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                        <th className="border p-2">No</th>
                        <th className="border p-2">Tanggal</th>
                        <th className="border p-2">Keterangan</th>
                        <th className="border p-2">Debit</th>
                        <th className="border p-2">Kredit</th>
                        <th className="border p-2">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        // Menghitung total debit dan kredit
                        if (item.jenis_transaksi === 'debit') {
                            totalDebit += parseFloat(item.nominal);
                        } else if (item.jenis_transaksi === 'kredit') {
                            totalKredit += parseFloat(item.nominal);
                        }
                        saldoAkumulatif = totalDebit - totalKredit;

                        return (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.tgl_pembayaran}</td>
                                <td className="border p-2">{item.deskripsi}</td>
                                <td className="border p-2 text-right">
                                    {item.jenis_transaksi === 'debit' ? formatRupiah(parseFloat(item.nominal)) : '-'}
                                </td>
                                <td className="border p-2 text-right">
                                    {item.jenis_transaksi === 'kredit' ? formatRupiah(parseFloat(item.nominal)) : '-'}
                                </td>
                                <td className="border p-2 text-right">{formatRupiah(saldoAkumulatif)}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="font-semibold">
                        <td className="border p-2" colSpan="3">Total</td>
                        <td className="border p-2 text-right">{formatRupiah(totalDebit)}</td>
                        <td className="border p-2 text-right">{formatRupiah(totalKredit)}</td>
                        <td className="border p-2 text-right">{formatRupiah(totalDebit - totalKredit)}</td>
                    </tr>
                </tfoot>
            </table>
    );
}
