import React, { useState } from "react";
import { Head } from '@inertiajs/react';
import CashierLayout from "@/Layouts/CashierLayout";
import Table from "@/Components/Tabungan/Table";
import Search from "@/Components/Tabungan/Search";
import { 
  FaUsers, 
  FaWallet, 
  FaHistory
} from 'react-icons/fa';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-start justify-between">
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
    <div className={`p-3 rounded-full bg-${color}-100`}>
      <Icon className={`h-6 w-6 text-${color}-600`} />
    </div>
  </div>
);

export default function Tabungan({ tabungan }) {
    const [filteredTabungan, setFilteredTabungan] = useState(tabungan);

    const handleSearch = (searchTerm) => {
        const filtered = tabungan.filter(item =>
            item.siswa.nama.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTabungan(filtered);
    };

    return (
        <CashierLayout>
            <Head title="Tabungan" />
            <div className="py-8 w-full">
                <div className=" mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-6">Tabungan</h1>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Siswa"
                            value="1,234"
                            icon={FaUsers}
                            color="blue"
                        />
                        <StatCard
                            title="Total Tabungan"
                            value="Rp 123.5M"
                            icon={FaWallet}
                            color="green"
                        />
                        <StatCard
                            title="Transaksi Hari Ini"
                            value="45"
                            icon={FaHistory}
                            color="yellow"
                        />
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b">
                            <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
                                Siswa
                            </button>
                            <button className="px-4 py-2 text-gray-500 font-medium">
                                Transaksi
                            </button>
                            <button className="px-4 py-2 text-gray-500 font-medium">
                                Riwayat
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-end mb-4">
                                <Search onSearch={handleSearch} />
                            </div>
                            <Table tabungan={filteredTabungan} />
                        </div>
                    </div>
                </div>
            </div>
        </CashierLayout>
    );
}