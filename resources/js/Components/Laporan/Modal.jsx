import React, { useState } from "react";
import { useForm } from '@inertiajs/react';

export default function Modal({ onClose }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        tgl_pembayaran: '',
        deskripsi: '',
        jenis_transaksi: 'debit',
        nominal: ''
    });

    function submit(e) {
        e.preventDefault();
        setIsSubmitting(true);

        post('/laporan', {
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Data berhasil ditambahkan!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    reset();
                    onClose(); // Call the onClose function from the parent component
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Terjadi kesalahan, periksa input anda!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    }

    return (
        <dialog id="modal_laporan" className="modal" open>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Form Debit Kredit</h3>
                <form onSubmit={submit} className="py-4"> 

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Tanggal</span>
                        </label>
                        <input 
                            type="date" 
                            name="tgl_pembayaran"
                            id="tgl_pembayaran" 
                            value={data.tgl_pembayaran} 
                            onChange={e => setData('tgl_pembayaran', e.target.value)}
                            className="input input-bordered w-full" 
                            required
                        />
                        {errors.tgl_pembayaran && <div className="text-red-500">{errors.tgl_pembayaran}</div>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Keterangan</span>
                        </label>
                        <input 
                            type="text" 
                            name="deskripsi"
                            id="deskripsi" 
                            value={data.deskripsi} 
                            onChange={e => setData('deskripsi', e.target.value)} 
                            className="input input-bordered w-full" 
                            placeholder="Masukkan Keterangan"
                            required
                        />
                        {errors.deskripsi && <div className="text-red-500">{errors.deskripsi}</div>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Jenis Transaksi</span>
                        </label>
                        <select 
                            name="jenis_transaksi"
                            id="jenis_transaksi" 
                            value={data.jenis_transaksi} 
                            onChange={e => setData('jenis_transaksi', e.target.value)}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="debit">Debit</option>
                            <option value="kredit">Kredit</option>
                        </select>
                        {errors.jenis_transaksi && <div className="text-red-500">{errors.jenis_transaksi}</div>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Nominal</span>
                        </label>
                        <input 
                            type="number" 
                            name="nominal" 
                            value={data.nominal} 
                            onChange={e => setData('nominal', e.target.value)} 
                            className="input input-bordered w-full" 
                            placeholder="Masukkan Nominal" 
                            required
                        />
                        {errors.nominal && <div className="text-red-500">{errors.nominal}</div>}
                    </div>

                    <div className="modal-action">
                        <button 
                            type="submit" 
                            className="btn bg-blue-700 text-white" 
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                        <button 
                            type="button" 
                            className="btn bg-red-700 text-white" 
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
