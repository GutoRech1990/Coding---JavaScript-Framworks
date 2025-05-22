import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// Fonction utilitaire pour trier les vaccins par nom (ordre alphabétique)
function sortVaccinsByName(vaccins) {
    return [...vaccins].sort((a, b) => a.name.localeCompare(b.name));
}

function IndexVaccins() {
    // États pour stocker les vaccins, patients et vaccinations
    const [vaccins, setVaccins] = useState([]);
    const [patients, setPatients] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);

    // Effet pour charger les données depuis l'API json-server au montage du composant
    useEffect(() => {
        // Charger la liste des vaccins
        fetch('http://localhost:3001/vaccins')
            .then(res => res.json())
            .then(data => setVaccins(data));
        // Charger la liste des patients
        fetch('http://localhost:3001/patients')
            .then(res => res.json())
            .then(data => setPatients(data));
        // Charger la liste des vaccinations
        fetch('http://localhost:3001/vaccinations')
            .then(res => res.json())
            .then(data => setVaccinations(data));
    }, []);

    // Liste des vaccins triée par nom
    const sortedVaccins = sortVaccinsByName(vaccins);

    // Fonction pour supprimer un vaccin avec vérification des patients liés
    const handleDelete = (vaccinId) => {
        // Filtrer les vaccinations liées à ce vaccin (comparaison par string pour éviter les problèmes de type)
        const relatedVaccinations = vaccinations.filter(
            v => String(v.vaccin_id) === String(vaccinId)
        );
        // Extraire les IDs des patients ayant reçu ce vaccin
        const relatedPatientIds = relatedVaccinations.map(v => String(v.patient_id));
        // Trouver les patients correspondants à ces IDs
        const relatedPatients = patients.filter(
            p => relatedPatientIds.includes(String(p.id))
        );

        // Si des patients ont reçu ce vaccin, afficher un message d'avertissement avec leurs noms
        if (relatedPatients.length > 0) {
            const patientNames = relatedPatients.map(p => p.name).join(', ');
            const confirmMsg = `Attention : Les patients suivants ont reçu ce vaccin :\n${patientNames}\n\nVoulez-vous vraiment supprimer ce vaccin ?`;
            if (!window.confirm(confirmMsg)) {
                return;
            }
        } else {
            // Sinon, simple confirmation de suppression
            if (!window.confirm("Voulez-vous vraiment supprimer ce vaccin ?")) {
                return;
            }
        }

        // Suppression du vaccin via l'API
        fetch(`http://localhost:3001/vaccins/${vaccinId}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Mise à jour de l'état local après suppression
            setVaccins(vaccins => vaccins.filter(v => v.id !== vaccinId));
        });
    };

    return (
        <div className="min-h-screen py-10 min-w-screen">
            <div className="w-full px-6 max-w-screen-xl mx-auto ">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Liste des vaccins</h1>
                {/* Bouton pour créer un nouveau vaccin, centré */}
                <div className="mb-6 flex justify-center">
                    <Link
                        to="/create-vaccin"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Nouveau vaccin
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-fit bg-white mx-auto rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Nom</th>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Fabricant</th>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Prix</th>
                                <th className="px-8 py-2 bg-blue-100 text-blue-800 font-semibold text-left whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Affichage de chaque vaccin dans la liste triée */}
                            {sortedVaccins.map((vaccine, idx) => (
                                <tr key={vaccine.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-4 py-1 border-b">{vaccine.name}</td>
                                    <td className="px-4 py-1 border-b">{vaccine.fabricant}</td>
                                    <td className="px-4 py-1 border-b">{vaccine.price}</td>
                                    <td className="px-8 py-1 border-b whitespace-nowrap">
                                        {/* Lien pour éditer le vaccin */}
                                        <Link
                                            to={`/edit-vaccin/${vaccine.id}`}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            title="Éditer le vaccin"
                                        >
                                            <i className="fa-solid fa-user-pen"></i>
                                        </Link>
                                        {/* Bouton pour supprimer le vaccin */}
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2"
                                            title="Supprimer le vaccin"
                                            onClick={() => handleDelete(vaccine.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default IndexVaccins;