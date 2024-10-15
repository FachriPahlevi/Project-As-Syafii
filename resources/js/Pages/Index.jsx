import React, {useState, useEffect} from 'react';
import CashierLayout from '../Layouts/CashierLayout';
import Card from '@/Components/Index/Card';
import Table from '@/Components/Index/Table';
import SiswaJenjangChart from '@/Components/Index/SiswaJenjangChart';
import LaporanChart from '@/Components/Index/LaporanChart';

import {
    UserGroupIcon,
    BanknotesIcon,
    CurrencyDollarIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import ModalUpdateAjaran from '@/Components/Index/ModalUpdateAjaran';

const Index = ({ totalSiswa, totalTabungan, pembayaranStatus, jenjang, lunas, histori }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
        console.log('haha');
    } 

    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const modal = document.getElementById('modal_Update_Ajaran');
        modal?.close();
    }, []);


    return (
        <CashierLayout>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
                    <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
                    onClick={handleShowModal}
                    >
                        Update Ajaran
                    </button>
                </div>
                
                {/* Cards Section */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card 
                        title="Total Siswa" 
                        description={totalSiswa}
                        icon={UserGroupIcon}
                    />  
                    <Card
                        title="Total Saldo" 
                        description={formatRupiah(totalTabungan)} 
                        icon={CurrencyDollarIcon}
                    />  
                    <Card 
                        title="Total Tabungan" 
                        description={formatRupiah(totalTabungan)} 
                        icon={BanknotesIcon}
                    />  
                    <Card 
                        title="SPP Belum Lunas" 
                        description={lunas}
                        icon={CheckCircleIcon}
                    />  
                </div>

                {/* Chart and Table Section */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="col-span-1 bg-white shadow-lg rounded-lg p-6 h-full flex flex-col">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Distribusi Jenjang Siswa</h2>
                        <div className="flex-grow">
                            <SiswaJenjangChart jenjang={jenjang} />
                        </div>
                    </div>
                    <div className="col-span-3 bg-white shadow-lg rounded-lg p-6 h-full flex flex-col">
                        <div className="flex-grow">
                            <LaporanChart data={histori} />
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className='grid grid-cols-4 gap-4'>
                    <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Status Pembayaran SPP</h2>
                        <div className="overflow-auto">
                            <Table data={pembayaranStatus} />
                        </div>
                    </div>
                    <div className="col-span-2 bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Status Pembayaran Daftar Ulang</h2>
                        <div className="overflow-auto">
                            <Table data={pembayaranStatus} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal&&(
                <>
                <div className="modal-backdrop"></div>
                <ModalUpdateAjaran 
                showModal={showModal}
                onClose={handleCloseModal}/>
                </>
            )}
        </CashierLayout>
    );
};

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(number);
}

export default Index;
