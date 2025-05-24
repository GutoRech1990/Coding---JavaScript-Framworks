import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// Fonction utilitaire pour trier les vaccins par nom (ordre alphabétique)
function sortVaccinsByName(vaccins) {
    return [...vaccins].sort((a, b) => a.name.localeCompare(b.name));
}

function IndexVaccins() {
    // États pour stocker la liste des vaccins, patients et vaccinations
    const [vaccins, setVaccins] = useState([]);
    const [patients, setPatients] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ message: '', onConfirm: null });

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

    // Fonction pour gérer la suppression d'un vaccin
    // Vérifie d'abord si des patients ont reçu ce vaccin
    // Si oui, affiche un avertissement avec la liste des patients concernés
    // Sinon, demande une simple confirmation
    const handleDelete = (vaccinId) => {
        // Filtre les vaccinations liées à ce vaccin
        const relatedVaccinations = vaccinations.filter(
            v => String(v.vaccin_id) === String(vaccinId)
        );
        // Récupère les IDs des patients concernés
        const relatedPatientIds = relatedVaccinations.map(v => String(v.patient_id));
        // Récupère les objets patients concernés
        const relatedPatients = patients.filter(
            p => relatedPatientIds.includes(String(p.id))
        );

        if (relatedPatients.length > 0) {
            // Si des patients ont reçu ce vaccin, affiche un message d'avertissement
            const patientNames = relatedPatients.map(p => p.name).join(', ');
            setModalContent({
                message: (
                    <>
                        <span className="font-bold text-red-600">Attention :</span> Les patients suivants ont reçu ce vaccin :<br />
                        <span className="text-blue-700">{patientNames}</span>
                        <br /><br />Voulez-vous vraiment supprimer ce vaccin ?
                    </>
                ),
                onConfirm: () => deleteVaccin(vaccinId)
            });
            setShowModal(true);
        } else {
            // Sinon, demande une simple confirmation
            setModalContent({
                message: "Voulez-vous vraiment supprimer ce vaccin ?",
                onConfirm: () => deleteVaccin(vaccinId)
            });
            setShowModal(true);
        }
    };

    // Fonction pour supprimer un vaccin de la base de données
    const deleteVaccin = (vaccinId) => {
        fetch(`http://localhost:3001/vaccins/${vaccinId}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Met à jour la liste locale des vaccins après suppression
            setVaccins(vaccins => vaccins.filter(v => v.id !== vaccinId));
            setShowModal(false);
        });
    };

    return (
        <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Modal de confirmation pour la suppression */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                        <div className="mb-6 text-lg">{modalContent.message}</div>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => {
                                    modalContent.onConfirm();
                                }}
                            >
                                Oui
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => setShowModal(false)}
                            >
                                Abandoner
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full px-4 max-w-3xl mx-auto">
                {/* Titre principal */}
                <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-800 drop-shadow">
                    💉 Liste des vaccins
                </h1>
                {/* Bouton pour créer un nouveau vaccin */}
                <div className="mb-8 flex justify-center">
                    <Link
                        to="/create-vaccin"
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                    >
                        <i className="fa-solid fa-plus"></i>
                        Nouveau vaccin
                    </Link>
                </div>
                {/* Tableau des vaccins */}
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="w-full rounded-xl overflow-hidden text-sm md:text-base">
                        <thead>
                            <tr>
                                {/* Nom du vaccin */}
                                <th className="px-2 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Nom</th>
                                {/* Fabricant */}
                                <th className="px-2 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Fabricant</th>
                                {/* Prix */}
                                <th className="px-2 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Prix</th>
                                {/* Actions (édition, suppression) */}
                                <th className="px-2 md:px-6 py-2 md:py-4 bg-blue-100 text-blue-900 font-bold text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Affichage de chaque vaccin dans une ligne du tableau */}
                            {sortedVaccins.map((vaccine, idx) => (
                                <tr
                                    key={vaccine.id}
                                    className={`transition-colors duration-150 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"} hover:bg-blue-200/40`}
                                >
                                    {/* Nom */}
                                    <td className="px-2 md:px-6 py-2 md:py-3 border-b border-blue-100 font-medium">{vaccine.name}</td>
                                    {/* Fabricant */}
                                    <td className="px-2 md:px-6 py-2 md:py-3 border-b border-blue-100">{vaccine.fabricant}</td>
                                    {/* Prix */}
                                    <td className="px-2 md:px-6 py-2 md:py-3 border-b border-blue-100">{vaccine.price} €</td>
                                    {/* Boutons d'action (édition et suppression) */}
                                    <td className="px-2 md:px-6 py-2 md:py-3 border-b border-blue-100 whitespace-nowrap">
                                        <div className="flex gap-0.5 md:gap-2 flex-nowrap">
                                            {/* Bouton pour éditer le vaccin */}
                                            <Link
                                                to={`/edit-vaccin/${vaccine.id}`}
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-4 py-2 rounded-full shadow transition-all duration-150"
                                                title="Éditer le vaccin"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </Link>
                                            {/* Bouton pour supprimer le vaccin */}
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-2 md:px-4 py-2 rounded-full shadow transition-all duration-150"
                                                title="Supprimer le vaccin"
                                                onClick={() => handleDelete(vaccine.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
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

export default IndexVaccins;