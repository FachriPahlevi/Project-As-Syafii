import React, { useState } from "react";
import CashierLayout from "@/Layouts/CashierLayout";
import Table from "@/Components/Tabungan/Table";
import Search from "@/Components/Tabungan/Search";

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
            <div>
                <h1 className="text-black font-semibold text-3xl mb-3">Tabungan</h1>
            </div>
            <div className="border-1 border-black rounded-xl shadow w-full bg-white">
                <div className="flex justify-end">
                    <Search className="justify-end" onSearch={handleSearch} />
                </div>
                <Table tabungan={filteredTabungan} />
            </div>
        </CashierLayout>
    );
}
