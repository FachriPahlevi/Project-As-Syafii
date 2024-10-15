import React, {useState, useRef} from 'react';
import CashierLayout from '../Layouts/CashierLayout';
import Table from '../Components/Siswa/Table';
import Pagination from '../Components/Siswa/Pagination';
import Modal from '../Components/Siswa/ModalTambah';

const Siswa = ({ siswa }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');
    const [selectedJenjang, setSelectedJenjang] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const siswaPerPage = 20;

    const openModalRef = useRef(null);

    const handleJenjangChange = (event) => {
        setSelectedJenjang(event.target.value);
    };
    const handleKelasChange = (event) => {
        setSelectedKelas(event.target.value);
    };
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSiswa = siswa.filter((item) => {
        const matchSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nama_ayah.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.nisn.startsWith(searchTerm);

        const matchJenjang = selectedJenjang ? item.jenjang.nama_jenjang.toLowerCase() === selectedJenjang.toLowerCase() : true;
        const matchKelas = selectedKelas ? item.kelas.nama_kelas.toLowerCase() === selectedKelas.toLowerCase() : true;

        return matchSearch && matchJenjang && matchKelas;
    });

    const indexOfLastSiswa = currentPage * siswaPerPage;
    const indexOfFirstSiswa = indexOfLastSiswa - siswaPerPage;
    const currentSiswa = filteredSiswa.slice(indexOfFirstSiswa, indexOfLastSiswa);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <CashierLayout>
            <div>
                <h1 className="text-black font-semibold text-3xl mb-3">Data Siswa</h1>
            </div>
            <div className="border-1 border-black rounded-md shadow w-full bg-white">
                <div className="flex justify-between">
                    <div className="">
                        <input 
                            className="my-3 mx-3 rounded-md bg-gray-200 border-none shadow-slate-900"
                            placeholder="Cari"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            type="text"
                        />
                        <select 
                            className="my-3 mx-3 rounded-md bg-gray-200 border-none shadow-slate-900"
                            value={selectedJenjang}
                            onChange={handleJenjangChange}
                        >
                            <option value="">Pilih Jenjang</option>
                            <option value="Paud">Paud</option>
                            <option value="TK">TK</option>
                            <option value="SD">SD</option>
                            <option value="SMP">SMP</option>
                        </select>
                        <select 
                            className="my-3 mx-3 rounded-md bg-gray-200 border-none shadow-slate-900"
                            value={selectedKelas}
                            onChange={handleKelasChange}
                        >
                            <option value="">Pilih Kelas</option>
                            <option value="Kelas 1">1</option>
                            <option value="Kelas 2">2</option>
                            <option value="Kelas 3">3</option>
                            <option value="Kelas 4">4</option>
                        </select>
                    </div>
                    <div className="my-3 mx-3">
                        <button
                            className="btn btn-primary p-5 text-center justify-center align-center mx-3"
                            onClick={() => openModalRef.current()}
                        >
                            Add
                        </button>
                        <button className="btn btn-success p-5 text-center justify-center align-center">
                            Import
                        </button>
                    </div>
                </div>
                <div className="mx-5">
                    <Table siswa={currentSiswa} />
                    <Pagination
                        siswaPerPage={siswaPerPage}
                        totalSiswa={filteredSiswa.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
                <Modal openModalRef={openModalRef} />
            </div>
        </CashierLayout>
    );
};

export default Siswa;
