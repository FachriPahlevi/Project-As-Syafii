import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useForm } from '@inertiajs/react';

export default function EditModal({ isOpen, onClose, spp }) {
    const { data, setData, put, processing, errors } = useForm({
        id: spp.id,
        nominal: spp.nominal,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('spp.update', data.id), {
            onSuccess: () => onClose(),
        });
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" open={isOpen} onClose={onClose}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <Dialog.Title className="text-lg font-bold">Edit Nominal</Dialog.Title>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="nominal" className="block text-sm font-medium text-gray-700">Nominal</label>
                                <input
                                    id="nominal"
                                    type="number"
                                    value={data.nominal}
                                    onChange={(e) => setData('nominal', e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                                    required
                                />
                                {errors.nominal && <p className="text-red-500 text-sm">{errors.nominal}</p>}
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="btn btn-secondary mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    );
}
