import React from 'react';

export default function Table({ data = [] }) {
    let totalDebit = 0;
    let totalKredit = 0;
    let saldoAkumulatif = 0;

    const formatRupiah = (number) => {
        return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    };

    const groupByDescription = (data) => {
        return data.reduce((acc, current) => {
            const key = current.deskripsi;

            if (!acc[key]) {
                acc[key] = {
                    deskripsi: current.deskripsi,
                    totalDebit: 0,
                    totalKredit: 0,
                };
            }

            if (current.jenis_transaksi === 'debit') {
                acc[key].totalDebit += parseFloat(current.nominal);
            } else if (current.jenis_transaksi === 'kredit') {
                acc[key].totalKredit += parseFloat(current.nominal);
            }

            return acc;
        }, {});
    };

    // Data yang sudah digabung berdasarkan deskripsi
    const groupedData = Object.values(groupByDescription(data));

    return (
        <div className="p-6 w-full mt-5 rounded-lg">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                        <th className="border p-2">No</th>
                        <th className="border p-2">Keterangan</th>
                        <th className="border p-2">Debit</th>
                        <th className="border p-2">Kredit</th>
                        <th className="border p-2">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {groupedData.map((item, index) => {
                        totalDebit += item.totalDebit;
                        totalKredit += item.totalKredit;
                        saldoAkumulatif = totalDebit - totalKredit;

                        return (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">{item.deskripsi}</td>
                                <td className="border p-2 text-right">
                                    {item.totalDebit > 0 ? formatRupiah(item.totalDebit) : '-'}
                                </td>
                                <td className="border p-2 text-right">
                                    {item.totalKredit > 0 ? formatRupiah(item.totalKredit) : '-'}
                                </td>
                                <td className="border p-2 text-right">{formatRupiah(saldoAkumulatif)}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="font-semibold">
                        <td className="border p-2" colSpan="2">Total</td>
                        <td className="border p-2 text-right">{formatRupiah(totalDebit)}</td>
                        <td className="border p-2 text-right">{formatRupiah(totalKredit)}</td>
                        <td className="border p-2 text-right">{formatRupiah(saldoAkumulatif)}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
