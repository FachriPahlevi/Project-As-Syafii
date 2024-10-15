import React, { useState } from "react";
import { useForm } from '@inertiajs/react';

export default function ModalUpdateAjaran({ onClose }) {
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
        <dialog id="modal_Update_Ajaran" className="modal" open>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Tahun Ajaran</h3>
                <form onSubmit={submit} className="py-4"> 

                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Tanggal Mulai</span>
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
                            <span className="label-text">Tanggal Berakhir</span>
                        </label>
                        <input 
                            type="date" 
                            name="tgl_pembayaran"
                            id="tgl_pembayaran"
                            pla 
                            value={data.tgl_pembayaran} 
                            onChange={e => setData('tgl_pembayaran', e.target.value)}
                            className="input input-bordered w-full" 
                            style={{ fontSize: '16px', height: '50px' }}
                            required
                        />
                        {errors.tgl_pembayaran && <div className="text-red-500">{errors.tgl_pembayaran}</div>}
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
