import React, { useState } from 'react';
import EditModal from './ModalEdit';
import {
    TrashIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

export default function Table({ siswa = [], onDelete }) {
    const [selectedSiswa, setSelectedSiswa] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (item) => {
        setSelectedSiswa(item);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            const result = await Swal.fire({
                title: 'Apakah Anda yakin?',
                text: 'Data siswa ini akan dihapus!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, hapus!',
                cancelButtonText: 'Batal'
            });

            if (result.isConfirmed) {
                await onDelete(id);
                Swal.fire({
                    title: 'Dihapus!',
                    text: 'Data siswa telah dihapus.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Error!',
                'Terjadi kesalahan saat menghapus data.',
                'error'
            );
        }
    };

    return (
        <>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full table-auto text-left text-sm">
                    <thead className="bg-gray-50">
                        <tr className="text-md font-semibold text-gray-700 uppercase">
                            <th className="py-3 px-4">#</th>
                            <th className="py-3 px-4">NISN</th>
                            <th className="py-3 px-4">Nama</th>
                            <th className="py-3 px-4">Jenjang</th>
                            <th className="py-3 px-4">Kelas</th>
                            <th className="py-3 px-4">Rombel</th>
                            <th className="py-3 px-4">Alamat</th>
                            <th className="py-3 px-4">Nama Ayah</th>
                            <th className="py-3 px-4">Nama Ibu</th>
                            <th className="py-3 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {siswa.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-100">
                                <td className="py-4 px-4 font-medium">{index + 1}</td>
                                <td className="py-4 px-4">{item.nisn}</td>
                                <td className="py-4 px-4">{item.nama}</td>
                                <td className="py-4 px-4">{item.jenjang ? item.jenjang.nama_jenjang : 'N/A'}</td>
                                <td className="py-4 px-4">{item.kelas ? item.kelas.nama_kelas : 'N/A'}</td>
                                <td className="py-4 px-4">{item.rombel ? item.rombel.nama_rombel : 'N/A'}</td>
                                <td className="py-4 px-4">{item.alamat}</td>
                                <td className="py-4 px-4">{item.nama_ayah}</td>
                                <td className="py-4 px-4">{item.nama_ibu}</td>
                                <td className="py-4 px-4 flex space-x-3">
                                    <button
                                        className="text-blue-600 flex items-center hover:underline"
                                        onClick={() => handleEditClick(item)}
                                    >
                                        <PencilSquareIcon className="h-5 w-5 mr-1" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        className="text-red-600 flex items-center hover:underlinez"
                                        onClick={() => handleDeleteClick(item.id)}
                                    >
                                        <TrashIcon className="h-5 w-5 mr-1" />
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedSiswa && (
                <EditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    siswa={selectedSiswa}
                />
            )}
        </>
    );
}
