import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

const SiswaJenjangChart = ({ jenjang }) => {
    useEffect(() => {
        const ctx = document.getElementById('siswaJenjangChart').getContext('2d');

        const jenjangLabels = jenjang.map(item => item.jenjang.nama_jenjang);
        const jenjangData = jenjang.map(item => item.total);

        let chartInstance = new Chart(ctx, {
            type: 'doughnut',  // Change to 'doughnut'
            data: {
                labels: jenjangLabels,
                datasets: [
                    {
                        label: 'Jumlah Siswa',
                        data: jenjangData,
                        backgroundColor: [
                            '#4C67F1',  
                            '#48E5C2',  
                            '#F04787',  
                            '#dedb40', 
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        cutout: '70%',  // Donut thickness
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            color: '#333333',
                            font: {
                                size: 14,
                                family: 'Arial, sans-serif'
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: (tooltipItem) => {
                                let label = tooltipItem.label || '';
                                const value = tooltipItem.raw || 0;
                                if (label) {
                                    label += ': ';
                                }
                                label += value.toLocaleString();  // Format the value as a string with commas
                                return label;
                            }
                        }
                    },
                    // Custom plugin to show central text
                    beforeDraw: (chart) => {
                        const width = chart.width;
                        const height = chart.height;
                        const ctx = chart.ctx;
                        ctx.restore();
                        const fontSize = (height / 114).toFixed(2);
                        ctx.font = fontSize + "em sans-serif";
                        ctx.textBaseline = "middle";

                        const text = jenjangData.reduce((a, b) => a + b, 0).toLocaleString();  // Total value in center
                        const textX = Math.round((width - ctx.measureText(text).width) / 2);
                        const textY = height / 2;

                        ctx.fillText(text, textX, textY);
                        ctx.save();
                    }
                },
                layout: {
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            chartInstance.destroy(); // Destroy chart instance on cleanup
        };
    }, [jenjang]);

    return (
        <div className="w-full max-h- p-5 rounded-lg">
            <canvas id="siswaJenjangChart"></canvas>
        </div>
    );
};

export default SiswaJenjangChart;
