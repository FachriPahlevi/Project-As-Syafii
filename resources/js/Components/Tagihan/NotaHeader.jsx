import React from 'react';

export default function NotaHeader() {
    return (
        <>
            <div className="flex items-center justify-center mb-4">
                <img 
                    src='img/logo.png'
                    className="h-16 w-16"
                    alt="Logo"
                />     
            </div>
            <div className="text-center border-b border-b-black border-dashed mb-4">
                <h2 className="text-sm font-semibold">YAYASAN AS-SYAFI'IYAH</h2>
                <h2 className="text-xs">Jl. Rejosari Pesantren III No.17, Kel. Benowo, Kec. Pakal, Surabaya, Jawa Timur, 60195</h2>
                <h2 className="text-xs mb-2">No. Telp 7409622</h2>
            </div>
        </>
    );
}