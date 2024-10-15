import React, { useState, useRef } from 'react';
import CashierLayout from '../Layouts/CashierLayout';
import Table from '../Components/Siswa/Table';
import Pagination from '../Components/Siswa/Pagination';
import Modal from '../Components/Siswa/ModalTambah';
import axios from 'axios';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Siswa = ({ siswa }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedJenjang, setSelectedJenjang] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const siswaPerPage = 20;

    const openModalRef = useRef(null);

    const handleJenjangChange = (event) => {
        setSelectedJenjang(event.target.value);
    };

    const handleKelasChange = (event) => {
        setSelectedKelas(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSiswa = siswa.filter((item) => {
        const matchSearch = (item.nama?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.nama_ayah?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (item.nisn?.startsWith(searchTerm) || false);

        const matchJenjang = selectedJenjang ? (item.jenjang?.nama_jenjang?.toLowerCase() || '') === selectedJenjang.toLowerCase() : true;
        const matchKelas = selectedKelas ? (item.kelas?.nama_kelas?.toLowerCase() || '') === selectedKelas.toLowerCase() : true;

        return matchSearch && matchJenjang && matchKelas;
    });

    // Hitung indeks siswa yang akan ditampilkan
    const indexOfLastSiswa = currentPage * siswaPerPage;
    const indexOfFirstSiswa = indexOfLastSiswa - siswaPerPage;
    const currentSiswa = filteredSiswa.slice(indexOfFirstSiswa, indexOfLastSiswa);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDeleteSiswa = async (id) => {
        try {
            await axios.delete(`/siswa/${id}`);            
            Swal.fire(
                'Dihapus!',
                'Data siswa telah dihapus.',
                'success'
            );
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
        <CashierLayout>
            <div className='flex justify-between items-center mb-6 w-full'>
                <h1 className="text-black flex justify-between font-semibold text-3xl">Data Siswa</h1>
                <div className="flex space-x-4">
                    <button
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        onClick={() => openModalRef.current()}
                    >
                        + Tambah
                    </button>
                    <button
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                    >
                        Import
                    </button>
                </div>
            </div>
            <div className="border border-gray-300 rounded-md shadow w-full bg-white p-6">
                <div className="flex flex-col md:flex-row items-center md:justify-between mb-4 gap-4">
                    <div className="relative flex-1">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            className="pl-10 w-42 rounded-md bg-white border hover:border-blue-300 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Cari"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-4 w-full md:w-auto">
                        <select
                            className="w-full md:w-48 rounded-md bg-white border  hover:border-blue-300 border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={selectedJenjang}
                            onChange={handleJenjangChange}
                        >
                            <option value="">Pilih Jenjang</option>
                            <option value="paud">PAUD</option>
                            <option value="tk">TK</option>
                            <option value="sd">SD</option>
                            <option value="smp">SMP</option>
                        </select>
                        <select
                            className="w-full md:w-48 rounded-md bg-white hover:border-blue-300 border border-gray-300 shadow-sm p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                <div className="mx-5">
                    <Table
                        siswa={currentSiswa}
                        onDelete={handleDeleteSiswa}
                    />
                    <Pagination
                        siswaPerPage={siswaPerPage}
                        totalSiswa={filteredSiswa.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                <Modal openModalRef={openModalRef} />
            </div>
        </CashierLayout>
    );
};

export default Siswa;
