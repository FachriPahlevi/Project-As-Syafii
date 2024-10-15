import React from 'react';

export default function PrintStyles() {
    return (
        <style>{`
            @media print {
                @page {
                    size: 10.5cm 21cm;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 0;
                    width: 10.5cm;
                    height: 21cm;
                }
                .nota-content {
                    width: 10.5cm;
                    height: 21cm;
                    padding: 0.5cm;
                    box-sizing: border-box;
                    font-size: 10pt;
                    page-break-after: always;
                }
                .no-print, .fixed {
                    display: none !important;
                }
                .nota-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 10.5cm;
                    height: 21cm;
                }
            }
        `}</style>
    );
}