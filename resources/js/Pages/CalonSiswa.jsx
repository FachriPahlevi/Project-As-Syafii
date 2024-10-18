import CashierLayout from '@/Layouts/CashierLayout';
import React from 'react';
import Table from '../Components/CalonSiswa/Table';

export default function CalonSiswa({ formData = [] }) {
    if (!formData.length) {
        return <p>Data siswa tidak tersedia.</p>;
    }

    return (
        <CashierLayout>
            <Table formData={formData}/>
        </CashierLayout>
    );
}
