import React, { useState } from 'react';

export default function Table({ siswa = [] }) {
    const [filterStatus, setFilterStatus] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Jumlah item per halaman

    const handleStatusChange = (event) => {
        setFilterStatus(event.target.value);
    };

    // Filter data berdasarkan status
    const filteredSiswa = filterStatus === 'All'
        ? siswa
        : siswa.filter(item => item.status_pembayaran === filterStatus);

    // Hitung index data untuk pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSiswa.slice(indexOfFirstItem, indexOfLastItem);

    // Hitung jumlah halaman
    const totalPages = Math.ceil(filteredSiswa.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="overflow-x-auto px-4 rounded-xl shadow w-full">
            <div className="flex justify-end mb-4">
                <input type="text" className="text-left p-2 border rounded" placeholder="Search..." />
            </div>
            <div className="flex justify-end mb-4">
                <select
                    className="p-2 border rounded"
                    value={filterStatus}
                    onChange={handleStatusChange}
                >
                    <option value="All">All</option>
                    <option value="Lunas">Lunas</option>
                    <option value="Belum Lunas">Belum Lunas</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-xs w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nama</th>
                            <th>Alamat</th>
                            <th>Tanggal Lahir</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index}>
                                <th>{indexOfFirstItem + index + 1}</th>
                                <td>{item.nama}</td>
                                <td>{item.alamat}</td>
                                <td>{item.nisn}</td>
                                <td>
                                    {item.status_pembayaran === 'Lunas'
                                        ? <span className="badge badge-secondary">{item.status_pembayaran}</span>
                                        : <span className="badge badge-primary">{item.status_pembayaran}</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <nav>
                    <ul className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                                <button
                                    onClick={() => handlePageChange(index + 1)}
                                    className="page-link"
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
