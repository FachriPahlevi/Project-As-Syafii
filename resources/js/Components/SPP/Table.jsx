import React, { useState } from 'react';
import EditModal from './Modal';

export default function Table({ spp = [] }) {
    const [selectedSPP, setSelectedSPP] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (item) => {
        setSelectedSPP(item);
        setIsModalOpen(true);
    };

    return (
        <>
            <table className="table table-xs">
                <thead>
                    <tr className="text-md font text-gray-700">
                        <th></th>
                        <th>Jenjang</th>
                        <th>Nominal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {spp.map((item, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{item.jenjang.nama_jenjang}</td>
                            <td>{item.nominal}</td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-primary" 
                                    onClick={() => handleEditClick(item)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedSPP && (
                <EditModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    spp={selectedSPP}
                />
            )}
        </>
    );
}
