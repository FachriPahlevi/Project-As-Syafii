// src/components/Table.js
import React from 'react';

export default function Table({ formData = [] }) {
    if (!formData.length) {
        return <p>Data siswa tidak tersedia.</p>;
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full table-auto text-left text-sm">
                <thead className="bg-gray-50">
                    <tr className="text-md font-semibold text-gray-700 uppercase">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">NIK</th>
                        <th className="py-3 px-4">Nama Lengkap</th>
                        <th className="py-3 px-4">Alamat</th>
                        <th className="py-3 px-4">Domisili</th>
                        <th className="py-3 px-4">Ayah</th>
                        <th className="py-3 px-4">Ibu</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {formData.map((item, index) => {
                        const formValue = item.form_value; // Access decoded form_value

                        return (
                            <tr key={item.form_id} className="hover:bg-gray-100">
                                <td className="py-4 px-4 font-medium">{index + 1}</td>
                                <td className="py-4 px-4">{formValue['nik']}</td>
                                <td className="py-4 px-4">{formValue['nama-lengkap']}</td>
                                <td className="py-4 px-4">{formValue['alamat-asal']}</td>
                                <td className="py-4 px-4">{formValue['alamat-domisili']}</td>
                                <td className="py-4 px-4">{formValue['nama-ayah']}</td>
                                <td className="py-4 px-4">{formValue['nama-ibu']}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
