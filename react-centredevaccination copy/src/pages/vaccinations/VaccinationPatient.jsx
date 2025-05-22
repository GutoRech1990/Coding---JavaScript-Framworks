import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VaccinationPatient = () => {
    const { id } = useParams() // Récupère l'id du patient depuis l'URL
    const [patient, setPatient] = useState(null) // Stocke les infos du patient
    const [vaccinations, setVaccinations] = useState([]) // Stocke les vaccinations du patient
    const [vaccins, setVaccins] = useState([]) // Stocke la liste de tous les vaccins
    const [showModal, setShowModal] = useState(false);
    const [modalVaccinationId, setModalVaccinationId] = useState(null);

    // Effet pour charger les données du patient, ses vaccinations et la liste des vaccins
    useEffect(() => {
        // Charger les infos du patient
        fetch(`http://localhost:3001/patients/${id}`)
            .then(res => res.json())
            .then(data => setPatient(data))

        // Charger les vaccinations du patient
        fetch(`http://localhost:3001/vaccinations?patient_id=${id}`)
            .then(res => res.json())
            .then(data => setVaccinations(data))

        // Charger la liste complète des vaccins
        fetch('http://localhost:3001/vaccins')
            .then(res => res.json())
            .then(data => setVaccins(data))
    }, [id])

    // Associer les noms des vaccins aux vaccinations du patient
    const patientVaccinationDetails = vaccinations.map(vaccination => {
        // Recherche du vaccin correspondant à la vaccination (comparaison par string pour gérer les IDs alphanumériques)
        const vaccine = vaccins.find(vaccine => String(vaccine.id) === String(vaccination.vaccin_id))
        return {
            ...vaccination,
            vaccineName: vaccine ? vaccine.name : "Unknown", // Affiche "Unknown" si le vaccin n'est pas trouvé
            vaccineDate: vaccination.vaccination_date
        }
    })

    // Fonction pour supprimer une vaccination (moderne)
    const handleDelete = (vaccinationId) => {
        setModalVaccinationId(vaccinationId);
        setShowModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://localhost:3001/vaccinations/${modalVaccinationId}`, {
            method: 'DELETE'
        })
        .then(() => {
            setVaccinations(vaccinations.filter(v => v.id !== modalVaccinationId));
            setShowModal(false);
            setModalVaccinationId(null);
        });
    };

    // Fonction pour éditer une vaccination (redirige vers une page d'édition)
    const handleEdit = (vaccinationId) => {
        // Redirige vers la page d'édition de la vaccination (à créer si besoin)
        window.location.href = `/edit-vaccination/${vaccinationId}`;
    };

    // Affiche un message de chargement si les infos du patient ne sont pas encore prêtes
    if (!patient) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen py-12 bg-gradient-to-br from-blue-50 to-blue-100">
            {/* Modal de confirmation */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                        <div className="mb-6 text-lg">
                            <span className="font-bold text-red-600">Attention :</span> Voulez-vous vraiment supprimer cette vaccination ?
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow transition"
                                onClick={confirmDelete}
                            >
                                Oui, supprimer
                            </button>
                            <button
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-full font-semibold shadow transition"
                                onClick={() => setShowModal(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full max-w-3xl mx-auto px-4">
                {/* Informations du patient */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 text-center">
                    <h2 className="text-2xl font-extrabold mb-4 text-blue-800 drop-shadow flex items-center justify-center gap-2">
                        <i className="fa-solid fa-user text-blue-500"></i>
                        Informations du Patient
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-900 mb-4">
                        <div><strong>Nom:</strong> {patient.name}</div>
                        <div><strong>Adresse:</strong> {patient.address}</div>
                        <div><strong>Date de naissance:</strong> {patient.birthdate}</div>
                        <div>
                            <strong>Âge:</strong> {new Date().getFullYear() - new Date(patient.birthdate).getFullYear()}
                        </div>
                    </div>
                    <Link
                        to={`/create-vaccination/${patient.id}`}
                        className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold"
                    >
                        <i className="fa-solid fa-syringe"></i>
                        Enregistrer une nouvelle vaccination
                    </Link>
                </div>
                
                {/* Tableau des vaccinations du patient */}
                <h1 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-syringe text-blue-500 mr-2"></i>
                    Vaccinations
                </h1>
                <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
                    <table className="w-full rounded-xl overflow-hidden">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 bg-blue-100 text-blue-900 font-bold text-left text-lg">Nom du vaccin</th>
                                <th className="px-6 py-4 bg-blue-100 text-blue-900 font-bold text-left text-lg">Date</th>
                                <th className="px-6 py-4 bg-blue-100 text-blue-900 font-bold text-left text-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientVaccinationDetails.map((vaccination, idx) => (
                                <tr
                                    key={idx}
                                    className={`transition-colors duration-150 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"} hover:bg-blue-200/40`}
                                >
                                    <td className="px-6 py-3 border-b border-blue-100 font-medium">{vaccination.vaccineName}</td>
                                    <td className="px-6 py-3 border-b border-blue-100">{vaccination.vaccineDate}</td>
                                    <td className="px-6 py-3 border-b border-blue-100 whitespace-nowrap flex gap-2">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition-all duration-150"
                                            onClick={() => handleDelete(vaccination.id)}
                                            title="Supprimer"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow transition-all duration-150"
                                            onClick={() => handleEdit(vaccination.id)}
                                            title="Éditer"
                                        >
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default VaccinationPatient