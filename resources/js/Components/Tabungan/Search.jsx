import React, { useState } from "react";

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
        <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={handleChange} // menetapkan handler event
            value={searchTerm} // menetapkan nilai input
        />
    );
}
