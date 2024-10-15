import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function Table({ data = [] }) {
    return (
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-[calc(100vh-200px)]">
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-50 sticky top-0">
                        <tr className="text-xs uppercase tracking-wider text-gray-700 font-semibold">
                            <th className="px-6 py-3 text-left">No</th>
                            <th className="px-6 py-3 text-left">Nama</th>
                            <th className="px-6 py-3 text-left">Kelas</th>
                            <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="text-sm text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.siswa.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.siswa.jenjang.nama_jenjang} {item.siswa.kelas.nama_kelas}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {item.status === 'Lunas' ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <CheckCircleIcon className="w-4 h-4 mr-1" />
                                            Lunas
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <XCircleIcon className="w-4 h-4 mr-1" />
                                            Belum
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}