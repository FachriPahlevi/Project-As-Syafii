import CashierLayout from "@/Layouts/CashierLayout";
import React from "react";

export default function Pengaturan(){
    return(
        <CashierLayout>
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-700">Pengaturan</h1>
                </div>
            </div>
        </CashierLayout>
    )
}