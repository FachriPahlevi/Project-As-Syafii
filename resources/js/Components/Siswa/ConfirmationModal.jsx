import React from 'react';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Konfirmasi Penghapusan</h2>
                <p>Apakah Anda yakin ingin menghapus data ini?</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Hapus
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
