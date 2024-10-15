import React from 'react';
import CashierLayout from '@/Layouts/CashierLayout';
import Table from '@/Components/SPP/Table';

const SPP = ({ spp }) => {
    return (
        <CashierLayout>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-4">Data Pembayaran SPP</h1>
                {/* Komponen Table akan menampilkan data spp */}
                <Table spp={spp} />
            </div>
        </CashierLayout>
    );
};

export default SPP;
