import React from 'react';

export default function TablePerAnak({ data = [] }) {
    return (
        <div className="p-6 w-full mt-5 rounded-lg">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="text-md font-semibold text-gray-700 bg-gray-100">
                        <th className="border p-2">No</th>
                        <th className="border p-2">Nama Siswa</th>
                        <th className="border p-2">Debit</th>
                        <th className="border p-2">Kredit</th>
                        <th className="border p-2">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border p-2">{index + 1}</td>
                            <td className="border p-2">{item.namaSiswa}</td>
                            <td className="border p-2 text-right">{item.debit}</td>
                            <td className="border p-2 text-right">{item.kredit}</td>
                            <td className="border p-2 text-right">{item.saldo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
