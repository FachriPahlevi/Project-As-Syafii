import React from 'react';

export default function NotaFooter({ handlePrint, closeModal }) {
    return (
        <div className="no-print flex justify- end gap-3 mt-4">
            <button onClick={handlePrint} className="btn btn-sm btn-primary">
                Cetak
            </button>
            <button onClick={closeModal} className="btn btn-sm btn-secondary">
                Tutup
            </button>
        </div>
    );
}