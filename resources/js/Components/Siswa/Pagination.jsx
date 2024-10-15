import React from 'react';

const Pagination = ({ siswaPerPage, totalSiswa, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalSiswa / siswaPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="inline-flex -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number} className={`px-3 py-2 border rounded-md cursor-pointer ${currentPage === number ? 'bg-gray-300' : 'bg-white'}`}>
                        <a onClick={() => paginate(number)} className="text-gray-700 hover:bg-gray-200">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
