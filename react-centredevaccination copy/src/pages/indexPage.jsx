import React from 'react';
import TotalPatientes from '../components/TotalPatientes';
import TotalVaccins from '../components/TotalVaccins';

const IndexPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 gap-8">
            <h1 className="text-3xl font-extrabold mb-8 text-blue-800 drop-shadow text-center">
                Tableau de bord
            </h1>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center">
                <TotalPatientes />
                <TotalVaccins />
            </div>
        </div>
    );
};

export default IndexPage;