import React from "react";

export default function Card({ title, description, icon: Icon }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 p-5 flex items-center space-x-4">
            <div className="bg-blue-100 p-4 rounded-full">
                {Icon && <Icon className="h-8 w-8 text-blue-500" />}
            </div>
            <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
                <p className="text-xl font-bold text-gray-900">{description}</p>
            </div>
        </div>
    );
}
