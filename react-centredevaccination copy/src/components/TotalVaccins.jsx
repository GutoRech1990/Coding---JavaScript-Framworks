import React, { useEffect, useState } from 'react';

const TotalVaccins = () => {
    // État pour stocker la liste des vaccins
    const [vaccins, setVaccins] = useState([]);
    // État pour gérer le chargement
    const [loading, setLoading] = useState(true);

    // Effet pour charger les vaccins depuis l'API au montage du composant
    useEffect(() => {
        fetch('http://localhost:3001/vaccins')
            .then(res => res.json())
            .then(data => {
                setVaccins(data);
                setLoading(false);
            });
    }, []);

    // Affiche un message de chargement pendant la récupération des données
    if (loading) {
        return (
            <div className="w-full bg-white rounded-xl shadow p-6 text-center text-blue-700">
                Chargement...
            </div>
        );
    }

    // Nombre total de vaccins
    const total = vaccins.length;
    // Dernier vaccin ajouté (supposé être le dernier de la liste)
    const lastVaccin = vaccins[vaccins.length - 1];

    return (
        <div className="w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4 items-center">
            <div className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                <i className="fa-solid fa-syringe text-blue-500"></i>
                Total de vaccins : <span className="text-green-600">{total}</span>
            </div>
            {lastVaccin ? (
                <div className="text-blue-700 text-lg text-center">
                    <div>
                        <span className="font-semibold">Dernier vaccin :</span> {lastVaccin.name}
                    </div>
                </div>
            ) : (
                <div className="text-blue-700">Aucun vaccin enregistré.</div>
            )}
        </div>
    );
};

export default TotalVaccins;