import React from 'react';

export default function LaporanSiswa({ filteredData, formatRupiah, startDate, endDate }) {
    const formatTanggal = (tanggal) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(new Date(tanggal));
    };

    const getTotalPendapatan = () => {
        return filteredData
            .filter(item => item.jenis_transaksi === 'debit')
            .reduce((total, item) => total + parseFloat(item.nominal), 0);
    };

    const getTotalPengeluaran = () => {
        return filteredData
            .filter(item => item.jenis_transaksi === 'kredit')
            .reduce((total, item) => total + parseFloat(item.nominal), 0);
    };

    const reducedData = filteredData.reduce((acc, current) => {
        const existingItem = acc.find(item => item.deskripsi === current.deskripsi);
        if (existingItem) {
            existingItem.nominal += parseFloat(current.nominal);
        } else {
            acc.push({ ...current, nominal: parseFloat(current.nominal) });
        }
        return acc;
    }, []);

    const exportToPDF = () => {
      window.print();
    };

    return (
        <div className="laporan_kas p-8 bg-gray-100 mt-5 bg-white" id="laporan_kas">
            <style>{`
    @media print {
        body * {
            visibility: hidden;
        }
        #laporan_kas, #laporan_kas * {
            visibility: visible;
        }
        #laporan_kas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }

        table {
            width: 100%;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        .text-right {
            text-align: right;
        }

        .signature {
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 50px;
        }
    }
`}</style>

            <div className='flex flex-col md:flex-row border-b-2 border-black p-5'>
                <div className='flex justify-start md:justify-center items-center'>
                    <img src="img/logo.png" className='h-28 w-28' alt="Logo" />
                </div>
                <div className='text-center flex-1'>
                    <h2 className="text-3xl font-semibold">Laporan Kas</h2>
                    <h2 className="text-3xl font-semibold">Yayasan As-Syafii</h2>
                    <p>Jl. Rejosari Pesantren III No.17, Kel. Benowo, Kec. Pakal, Surabaya, Jawa Timur, 60195</p>
                    <p>Email: sdunggulanalhikmah@gmail.com | Telepon: 7409622</p>
                </div>
            </div>
            <h2 className="text-md font-medium mb-4">
                Periode {startDate ? formatTanggal(startDate) : '...'} s.d. {endDate ? formatTanggal(endDate) : '...'}
            </h2>
            <table className="w-full mt-5 border-collapse">
                <tbody>
                    {/* Pendapatan */}
                    <tr className='border-b border-gray-300'>
                        <td className="py-2 font-bold">Pendapatan</td>
                    </tr>
                    {reducedData.filter(item => item.jenis_transaksi === 'debit').map((item, index) => (
                        <tr key={index}>
                            <td className="pl-4 py-2">{item.deskripsi}</td>
                            <td className="text-right">{formatRupiah(item.nominal)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="py-2 font-bold">Total Pendapatan</td>
                        <td className="text-right font-semibold">{formatRupiah(getTotalPendapatan())}</td>
                    </tr>

                    {/* Pengeluaran */}
                    <tr className='border-b border-gray-300'>
                        <td className="py-2 font-bold">Pengeluaran</td>
                    </tr>
                    {reducedData.filter(item => item.jenis_transaksi === 'kredit').map((item, index) => (
                        <tr key={index}>
                            <td className="pl-4 py-2">{item.deskripsi}</td>
                            <td className="text-right">{formatRupiah(item.nominal)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td className="py-2 font-bold">Total Pengeluaran</td>
                        <td className="text-right font-semibold">- {formatRupiah(getTotalPengeluaran())}</td>
                    </tr>

                    {/* Saldo Akhir */}
                    <tr>
                        <td className="py-2 font-bold">Laba</td>
                        <td className="text-right font-semibold">{formatRupiah(getTotalPendapatan() - getTotalPengeluaran())}</td>
                    </tr>
                </tbody>
            </table>

            <div className='signature flex justify-end border-gray-300 pt-5'>
                <div className='text-right'>
                    <h1>Surabaya, {endDate ? formatTanggal(endDate) : '...'}</h1>
                    <h1>Bendahara</h1>
                    <div className='my-16'>
                        <h1>Syafira Aulia</h1>
                        <h1>NIP 20937438983</h1>
                    </div>
                </div>
            </div>

            <div className='flex justify-end'>
                <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg" id="btn-pdf"
                    onClick={exportToPDF}
                >
                    Unduh PDF
                </button>
            </div>
        </div>
    );
}
