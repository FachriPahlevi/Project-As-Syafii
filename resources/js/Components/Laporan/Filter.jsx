import React, { useState } from 'react';

export default function Filter({ onFilter, siswa }) {
    const [activeTab, setActiveTab] = useState('Yayasan');
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        if (onFilter) {
            const filters = { startDate, endDate};
            onFilter(filters);
        }
    };
    return (
        <div>
            {/* Form Filter berdasarkan Tab */}
            <div className="p-6 bg-white shadow-md rounded-lg mt-4">
                <h1 className="text-xl font-semibold mb-4">Filter Laporan</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="mulai-tanggal">Mulai Tanggal</label>
                        <input
                            type="date"
                            id="mulai-tanggal"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="akhir-tanggal">Akhir Tanggal</label>
                        <input
                            type="date"
                            id="akhir-tanggal"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        />
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                        onClick={handleFilter}
                    >
                        Tampilkan
                    </button>
                </div>
            </div>
        </div>
    );
}
