import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="relative flex items-center border border-gray-300 rounded-lg shadow-sm
        mx-auto ml-auto my-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-400 transition-all duration-300">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3" />
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                className="pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-400 transition-all duration-300"
                placeholder="Cari siswa..."
            />
        </div>
    );
}
