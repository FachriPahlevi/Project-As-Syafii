import React, {useState} from 'react';

export default function Informasi({data = []}){
    return(
        <div className="">
            <div className="mx-3">
                <h1 className="font-medium text-md">Informasi Siswa</h1>
            </div>
            <div className="mx-5 my-5">
                <p className="my-3">Tahun ajaran   : 2021/2022</p>
                <p className="my-3">NISN           : 234297302</p>
                <p className="my-3">Nama Siswa     : Fachri Pahlevi</p>
                <p className="my-3">Status         : Lunas</p>
            </div>
        </div>
    );
}
