export default function Nota({ selectedPayment, printNota, closeModal }) {
    if (!selectedPayment) {
        return null; 
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Nota Pembayaran</h2>
                <p><strong>Nama:</strong> {selectedPayment.siswa?.nama}</p>
                <p><strong>NISN:</strong> {selectedPayment.siswa?.nisn}</p>
                <p><strong>Tahun:</strong> {selectedPayment.year}</p>
                <p><strong>Bulan:</strong> {selectedPayment.month}</p>
                <p><strong>Nominal:</strong> {selectedPayment.nominal
                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedPayment.nominal)
                    : 'Nominal tidak tersedia'}
                </p>
                <p><strong>Status:</strong> {selectedPayment.status}</p>

                <div className="flex justify-between mt-4">
                    <button onClick={printNota} className="btn btn-sm btn-primary">
                        Cetak Nota
                    </button>
                    <button onClick={closeModal} className="btn btn-sm btn-secondary">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
