import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Daftarkan elemen yang digunakan untuk grafik bar
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function LaporanChart({ data = [], height = '400px' }) {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Debit',
                data: [],
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
            },
            {
                label: 'Kredit',
                data: [],
                backgroundColor: '#DB1532',
                borderColor: '#DB1532',
                borderWidth: 1,
            },
        ],
    });

    const [timeFilter, setTimeFilter] = useState('This Week'); // Mengatur filter waktu

    useEffect(() => {
        const processData = () => {
            const dataByDate = data.reduce((acc, current) => {
                const date = new Date(current.tgl_pembayaran);
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();
                const dayName = date.toLocaleString('id-ID', { weekday: 'long' });

                let key;
                if (timeFilter === 'This Week') {
                    key = dayName;
                } else if (timeFilter === 'This Month') {
                    key = day;
                } else if (timeFilter === 'This Year') {
                    key = date.toLocaleString('id-ID', { month: 'long' });
                }

                if (!acc[key]) {
                    acc[key] = { debit: 0, kredit: 0 };
                }

                if (current.jenis_transaksi === 'debit') {
                    acc[key].debit += parseFloat(current.nominal);
                } else if (current.jenis_transaksi === 'kredit') {
                    acc[key].kredit += parseFloat(current.nominal);
                }

                return acc;
            }, {});

            const labels = Object.keys(dataByDate);
            const debitData = labels.map((key) => dataByDate[key].debit);
            const kreditData = labels.map((key) => dataByDate[key].kredit);

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Debit',
                        data: debitData,
                        backgroundColor: '#04ba1f',
                        borderColor: '#04ba1f',
                        borderWidth: 1,
                    },
                    {
                        label: 'Kredit',
                        data: kreditData,
                        backgroundColor: '#DB1532',
                        borderColor: '#DB1532',
                        borderWidth: 1,
                    },
                ],
            });
        };

        processData();
    }, [data, timeFilter]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14, // Ukuran font legend
                    },
                    usePointStyle: true,
                    padding: 20,
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                title: {
                    display: true,
                    text: timeFilter === 'This Week' ? 'Hari' : timeFilter === 'This Month' ? 'Tanggal' : 'Bulan',
                },
            },
            y: {
                grid: {
                    display: false,
                    color: '#e9e9e9', // Warna grid pada referensi
                },
                ticks: {
                    beginAtZero: true,
                    callback: (value) => {
                        if (value >= 1000) {
                            return (value / 1000).toFixed(1) + 'k'; // Menampilkan nilai ribuan dalam bentuk singkat
                        }
                        return value; // Menampilkan nilai dalam bentuk bulat
                    },
                },
            },
        },
        elements: {
            bar: {
                borderRadius: 10, // Mengatur rounded bar
            }
        }
    };

    return (
        <div className="p-1 flex w-full rounded-lg justify-between" style={{ height }}>
            <Bar data={chartData} options={options} />
            <div className="flex space-x-3 mb-3 flex-end justify-end">
                <div className="ml-auto relative">
                    <select
                        className="border border-gray-300 rounded-md p-2 shadow-sm cursor-pointer"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                    >
                        <option value="This Week">Mingguan</option>
                        <option value="This Month">Bulanan</option>
                        <option value="This Year">Tahunan</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
