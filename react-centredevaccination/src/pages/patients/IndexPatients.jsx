import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// Fonction pour calculer l'âge à partir de la date de naissance
function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function IndexPatients() {
    // État pour stocker la liste des patients
    const [patients, setPatients] = useState([]);

    // useEffect pour charger les patients au montage du composant
    useEffect(() => {
        // Charger tous les patients depuis l'API json-server
        fetch('http://localhost:3001/patients')
            .then(res => res.json())
            .then(data => setPatients(data));
    }, []);

    // Trie les patients par nom (ordre alphabétique)
    const sortedPatients = [...patients].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    // Fonction pour supprimer un patient
    // Vérifie d'abord si le patient a des vaccinations enregistrées
    // Si oui, affiche une alerte et empêche la suppression
    // Sinon, demande une confirmation puis supprime le patient
    const handleDelete = (patientId) => {
        // Toujours rechercher les vaccinations les plus récentes avant de supprimer
        fetch('http://localhost:3001/vaccinations?patient_id=' + patientId)
            .then(res => res.json())
            .then(patientVaccinations => {
                // Si le patient a des vaccinations, on empêche la suppression
                if (patientVaccinations.length > 0) {
                    alert("Ce patient a des vaccinations enregistrées. Supprimez d'abord les vaccinations avant de supprimer le patient.");
                    return;
                }
                // Confirmation avant suppression
                if (window.confirm("Voulez-vous vraiment supprimer ce patient ?")) {
                    fetch(`http://localhost:3001/patients/${patientId}`, {
                        method: 'DELETE'
                    })
                    .then(() => {
                        // Met à jour la liste locale des patients après suppression
                        setPatients(patients.filter(p => p.id !== patientId));
                    });
                }
            });
    };

    return (
        <div className="min-h-screen py-10 min-w-screen">
            <div className="w-full px-6 max-w-screen-xl mx-auto ">
                {/* Titre de la page */}
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Liste des patients</h1>
                {/* Bouton pour créer un nouveau patient, centré */}
                <div className="mb-6 flex justify-center">
                    <Link
                        to="/create-patient"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        + Nouveau patient
                    </Link>
                </div>
                {/* Tableau des patients */}
                <div className="overflow-x-auto">
                    <table className="w-fit bg-white mx-auto rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Nom</th>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Adresse</th>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Âge</th>
                                <th className="px-8 py-2 bg-blue-100 text-blue-800 font-semibold text-left whitespace-nowrap">Date de naissance</th>
                                <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Affichage de chaque patient dans une ligne du tableau */}
                            {sortedPatients.map((patient, idx) => (
                                <tr key={patient.id} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="px-4 py-1 border-b">{patient.name}</td>
                                    <td className="px-4 py-1 border-b">{patient.address}</td>
                                    <td className="px-4 py-1 border-b">{calculateAge(patient.birthdate)}</td>
                                    <td className="px-8 py-1 border-b whitespace-nowrap">{patient.birthdate}</td>
                                    <td className="px-4 py-1 border-b">
                                        {/* Bouton pour éditer le patient */}
                                        <Link
                                            to={`/edit-patient/${patient.id}`}
                                            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                            title="Éditer le patient"
                                        >
                                            <i className="fa-solid fa-user-pen"></i>
                                        </Link>
                                        {/* Bouton pour supprimer le patient */}
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 ml-2"
                                            onClick={() => handleDelete(patient.id)}
                                            title="Supprimer le patient"
                                        >
                                            <i className="fa-solid fa-eraser"></i>
                                        </button>
                                        {/* Lien pour voir les vaccinations du patient */}
                                        <Link
                                            to={`/vaccination/${patient.id}`}
                                            className="bg-green-500 text-white px-4 py-1 rounded ml-2 inline-block"
                                            title="Voir les vaccinations"
                                        >
                                            <i className="fa-solid fa-syringe"></i>
                                        </Link>
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

export default IndexPatients;
