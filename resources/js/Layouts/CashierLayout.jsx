import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Helmet } from 'react-helmet';

const CashierLayout = ({ children }) => {
    return (
        <div className="flex flex-col sm:flex-row min-h-screen w-full">
            <Helmet>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            <aside className="w-full sm:w-64">
                <Sidebar />
            </aside>

            <main className="flex flex-1 flex-col items-center min-h-screen sm:items-start justify-center sm:justify-start p-4 sm:p-8">
                {children}
            </main>
        </div>
    );
};

export default CashierLayout;
