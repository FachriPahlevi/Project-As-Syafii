import React from 'react';

export default function NotaContent() {
    return (
        <>
            <h2 className="text-lg font-semibold mb-2">Pembayaran SPP</h2>
            <InfoRow label="Nama"  />
            <InfoRow label="NISN"  />
            <InfoRow label="Tanggal Pembayaran" />
            <InfoRow label="Keterangan"  />
            <InfoRow 
                label="Nominal" 
                value={selectedPayment.nominal
                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(nota.nominal)
                    : 'Nominal tidak tersedia'
                } 
            />
            <InfoRow label="Status" value={selectedPayment.status} />
        </>
    );
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between mb-1">
            <p className="text-xs">{label}:</p>
            <p className="text-xs">{value}</p>
        </div>
    );
}