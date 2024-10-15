import React from "react";

export default function History({ data = [] }){
    return(
        <div>
            <h1>Histori Transaksi</h1>
            <table className="table table-xs">
            <thead>
                <tr className="text-md font text-gray-700">
                    <th>No</th>
                    <th>Tahun</th>
                    <th>Bulan</th>
                    <th>status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.year}</td>
                        <td>{item.month}</td>
                        <td>{item.status}</td>
                        <td>Edit</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}