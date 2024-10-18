import React, { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="relative flex-1">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
            type="text"
            placeholder="Type here"
            className="pl-10 w-42 rounded-md bg-white border hover:border-blue-300 border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleChange} // menetapkan handler event
            value={searchTerm} // menetapkan nilai input
        />
    </div>
        
    );
}
