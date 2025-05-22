import React, { useEffect, useState } from 'react';

const TotalPatientes = () => {
    // État pour stocker la liste des patients
    const [patients, setPatients] = useState([]);
    // État pour gérer le chargement
    const [loading, setLoading] = useState(true);

    // Effet pour charger les patients depuis l'API au montage du composant
    useEffect(() => {
        fetch('http://localhost:3001/patients')
            .then(res => res.json())
            .then(data => {
                setPatients(data);
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

    // Nombre total de patients
    const total = patients.length;
    // Dernier patient ajouté (supposé être le dernier de la liste)
    const lastPatient = patients[patients.length - 1];

    return (
        <div className="w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4 items-center">
            <div className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                <i className="fa-solid fa-users text-blue-500"></i>
                Total de patients : <span className="text-green-600">{total}</span>
            </div>
            {lastPatient ? (
                <div className="text-blue-700 text-lg text-center">
                    <div>
                        <span className="font-semibold">Dernier patient :</span> {lastPatient.name}
                    </div>
                </div>
            ) : (
                <div className="text-blue-700">Aucun patient enregistré.</div>
            )}
        </div>
    );
};

export default TotalPatientes;