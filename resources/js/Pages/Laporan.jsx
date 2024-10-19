import React, { useState, useEffect } from 'react';
import CashierLayout from "@/Layouts/CashierLayout";
import Filter from "@/Components/Laporan/Filter";
import Table from "@/Components/Laporan/Table";
import TablePerkelas from "@/Components/Laporan/TablePerkelas";
import TablePerAnak from "@/Components/Laporan/TablePerAnak";
import Modal from "@/Components/Laporan/Modal";
import * as XLSX from 'xlsx';
import LaporanKas from '@/Components/Laporan/LaporanKas';
import {
    DocumentArrowDownIcon,
    FolderArrowDownIcon,
} from '@heroicons/react/24/outline';

export default function Laporan({ transaksi, siswa }) {
    const [filteredData, setFilteredData] = useState(transaksi);
    const [showLaporanKas, setShowLaporanKas] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activeTab, setActiveTab] = useState('Yayasan');  // Ubah dari category ke activeTab

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleFilter = (filters) => {
        const { startDate, endDate} = filters;
        setStartDate(startDate);
        setEndDate(endDate);

        let filtered = transaksi.filter(item => {
            const isWithinDateRange = (!startDate || item.tgl_pembayaran >= startDate) &&
                                      (!endDate || item.tgl_pembayaran <= endDate);
            return isWithinDateRange;
        });

        if (activeTab === 'Perkelas') {
            filtered = filtered.filter(item => item.jenjang === jenjang && item.kelas === kelas);
        } else if (activeTab === 'PerAnak') {
            filtered = filtered.filter(item => item.namaSiswa.toLowerCase().includes(namaSiswa.toLowerCase()));
        }

        setFilteredData(filtered);
        setShowTable(true);
    };

    const exportToExcel = () => {
        const wsData = [];
        let totalDebit = 0;
        let totalKredit = 0;
        let saldoAkumulatif = 0;

        wsData.push(["No", "Keterangan", "Debit", "Kredit", "Saldo"]);

        filteredData.forEach((item, index) => {
            const debit = item.jenis_transaksi === 'debit' ? formatRupiah(item.nominal) : '-';
            const kredit = item.jenis_transaksi === 'kredit' ? formatRupiah(item.nominal) : '-';
            saldoAkumulatif += item.jenis_transaksi === 'debit' ? parseFloat(item.nominal) : 0;
            saldoAkumulatif -= item.jenis_transaksi === 'kredit' ? parseFloat(item.nominal) : 0;
            const saldoFormatted = formatRupiah(saldoAkumulatif.toFixed(2));
            wsData.push([
                index + 1,
                item.deskripsi,
                debit,
                kredit,
                saldoFormatted
            ]);

            if (item.jenis_transaksi === 'debit') {
                totalDebit += parseFloat(item.nominal);
            } else if (item.jenis_transaksi === 'kredit') {
                totalKredit += parseFloat(item.nominal);
            }
        });

        wsData.push(["", "Total", formatRupiah(totalDebit.toFixed(2)), formatRupiah(totalKredit.toFixed(2)), formatRupiah((totalDebit - totalKredit).toFixed(2))]);

        const ws = XLSX.utils.aoa_to_sheet(wsData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Laporan");
        XLSX.writeFile(wb, "laporan.xlsx");
    };

    const formatRupiah = (amount) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    };

    const handleBuatLaporan = () => {
        setShowLaporanKas(true);
    };

    return (
        <CashierLayout>
            <div className="p-6 min-h-screen w-full">
                <div className="flex justify-between mb-6">
                    <h1 className="text-black font-semibold text-3xl">Laporan</h1>
                    <button 
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md 
                        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out" 
                        onClick={handleShowModal}>+ Tambah</button>
                </div>

                <div className="w-full mb-5">
                    <Filter onFilter={handleFilter} siswa={siswa} />
                </div>

                <div className="p-6 bg-white shadow-md rounded-lg">
                    
                {/* Tab Kategori */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("Yayasan")}
                        className={`px-4 py-2 font-medium ${
                            activeTab === "Yayasan"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        Laporan Yayasan
                    </button>
                    <button
                        onClick={() => setActiveTab("Perkelas")}
                        className={`px-4 py-2 font-medium ${
                            activeTab === "Perkelas"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        Laporan Perkelas
                    </button>
                    <button
                        onClick={() => setActiveTab("PerAnak")}
                        className={`px-4 py-2 font-medium ${
                            activeTab === "PerAnak"
                                ? "text-blue-600 border-b-2 border-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        Laporan PerAnak
                    </button>
                </div>

                    <div className='flex justify-between items-center text-center mb-3 mt-5'>
                        <h1 className="text-xl font-semibold">Laporan Pemasukan & Pengeluaran</h1>
                        <div className="space-x-2">
                            <button 
                                className="btn bg-white-600 border border-gray-400 font-light text-black"
                                onClick={exportToExcel}>
                                <FolderArrowDownIcon className='w-6 h-6'/> Ekspor ke Excel
                            </button>
                            <button 
                                className="btn bg-white-600 border border-gray-400 font-light text-black"
                                onClick={handleBuatLaporan}>
                                <DocumentArrowDownIcon className='w-6 h-6'/> Lihat Laporan
                            </button>
                        </div>
                    </div>
                    
                    {/* Tampilkan tabel berdasarkan kategori yang dipilih */}
                    {showTable && (
                        <>
                            {activeTab === 'Yayasan' && <Table data={filteredData} />}
                            {activeTab === 'Perkelas' && <TablePerkelas data={filteredData} />}
                            {activeTab === 'PerAnak' && <TablePerAnak data={filteredData} />}
                        </>
                    )}
                </div>

                {showLaporanKas && (
                    <LaporanKas 
                        filteredData={filteredData} 
                        formatRupiah={formatRupiah}
                        startDate={startDate}
                        endDate={endDate} 
                    />
                )}
            </div>

            {showModal && (
                <>
                    <div className="modal-backdrop"></div>
                    <Modal 
                        showModal={showModal}
                        onClose={handleCloseModal} />
                </>
            )}
        </CashierLayout>
    );
}
