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
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', onConfirm: null });

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
        fetch('http://localhost:3001/vaccinations?patient_id=' + patientId)
            .then(res => res.json())
            .then(patientVaccinations => {
                if (patientVaccinations.length > 0) {
                    setModalContent({
                        message: (
                            <>
                                <span className="font-bold text-red-600">Attention :</span> Ce patient a des vaccinations enregistrées.<br />
                                <span className="text-blue-700">Supprimez d'abord les vaccinations avant de supprimer le patient.</span>
                            </>
                        ),
                        onConfirm: null
                    });
                    setShowModal(true);
                    return;
                }
                setModalContent({
                    message: "Voulez-vous vraiment supprimer ce patient ?",
                    onConfirm: () => {
                        fetch(`http://localhost:3001/patients/${patientId}`, {
                            method: 'DELETE'
                        })
                        .then(() => {
                            setPatients(patients => patients.filter(p => p.id !== patientId));
                            setShowModal(false);
                        });
                    }
                });
                setShowModal(true);
            });
    };

    return (
        <div className="min-h-screen py-4 md:py-12 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Modal de confirmation */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-2xl p-4 md:p-8 max-w-md w-full text-center">
                        <div className="mb-6 text-lg">{modalContent.message}</div>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {modalContent.onConfirm ? (
                                <>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow transition"
                                        onClick={modalContent.onConfirm}
                                    >
                                        Oui, supprimer
                                    </button>
                                    <button
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 md:px-6 py-2 rounded-full font-semibold shadow transition"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Annuler
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full font-semibold shadow transition"
                                    onClick={() => setShowModal(false)}
                                >
                                    Fermer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full px-1 md:px-4 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-8 text-center text-blue-800 drop-shadow">
                    🧑‍⚕️ Liste des patients
                </h1>
                <div className="mb-4 md:mb-8 flex justify-center">
                    <Link
                        to="/create-patient"
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-sm md:text-base"
                    >
                        <i className="fa-solid fa-plus"></i>
                        Nouveau patient
                    </Link>
                </div>
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="w-full rounded-xl overflow-hidden text-sm md:text-base">
                        <thead>
                            <tr>
                                <th className="px-1 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Nom</th>
                                <th className="px-1 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Adresse</th>
                                {/* Âge et Date de naissance seulement en desktop */}
                                <th className="px-1 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left whitespace-nowrap hidden md:table-cell">Âge</th>
                                <th className="px-1 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left whitespace-nowrap hidden md:table-cell">Date de naissance</th>
                                <th className="px-1 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPatients.map((patient, idx) => (
                                <tr
                                    key={patient.id}
                                    className={`transition-colors duration-150 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"} hover:bg-blue-200/40`}
                                >
                                    <td className="px-1 md:px-6 py-2 md:py-3 border-b border-blue-100 font-medium">{patient.name}</td>
                                    <td className="px-1 md:px-6 py-2 md:py-3 border-b border-blue-100">{patient.address}</td>
                                    {/* Âge et Date de naissance seulement en desktop */}
                                    <td className="px-1 md:px-6 py-2 md:py-3 border-b border-blue-100 hidden md:table-cell">{calculateAge(patient.birthdate)}</td>
                                    <td className="px-1 md:px-6 py-2 md:py-3 border-b border-blue-100 whitespace-nowrap hidden md:table-cell">{patient.birthdate}</td>
                                    <td className="px-1 md:px-6 py-2 md:py-3 border-b border-blue-100 whitespace-nowrap">
                                        <div className="flex gap-0.5 md:gap-2 flex-nowrap">
                                            <Link
                                                to={`/edit-patient/${patient.id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-4 py-2 rounded-full shadow transition-all duration-150"
                                                title="Éditer le patient"
                                            >
                                                <i className="fa-solid fa-user-pen"></i>
                                            </Link>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-2 rounded-full shadow transition-all duration-150"
                                                onClick={() => handleDelete(patient.id)}
                                                title="Supprimer le patient"
                                            >
                                                <i className="fa-solid fa-eraser"></i>
                                            </button>
                                            <Link
                                                to={`/vaccination/${patient.id}`}
                                                className="bg-green-500 hover:bg-green-600 text-white px-2 md:px-4 py-2 rounded-full shadow transition-all duration-150"
                                                title="Voir les vaccinations"
                                            >
                                                <i className="fa-solid fa-syringe"></i>
                                            </Link>
                                        </div>
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
