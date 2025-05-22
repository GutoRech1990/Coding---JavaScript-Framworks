import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const VaccinationPatient = () => {
    const { id } = useParams() // Récupère l'id du patient depuis l'URL
    const [patient, setPatient] = useState(null) // Stocke les infos du patient
    const [vaccinations, setVaccinations] = useState([]) // Stocke les vaccinations du patient
    const [vaccins, setVaccins] = useState([]) // Stocke la liste de tous les vaccins

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

    // Fonction pour supprimer une vaccination
    const handleDelete = (vaccinationId) => {
        if (window.confirm("Confirmer la suppression de cette vaccination ?")) {
            fetch(`http://localhost:3001/vaccinations/${vaccinationId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Met à jour la liste locale après suppression
                setVaccinations(vaccinations.filter(v => v.id !== vaccinationId));
            });
        }
    };

    // Fonction pour éditer une vaccination (redirige vers une page d'édition)
    const handleEdit = (vaccinationId) => {
        // Redirige vers la page d'édition de la vaccination (à créer si besoin)
        window.location.href = `/edit-vaccination/${vaccinationId}`;
    };

    // Affiche un message de chargement si les infos du patient ne sont pas encore prêtes
    if (!patient) return <div className="p-6 text-center">Chargement...</div>

    return (
        <div>
            {/* Informations du patient */}
            <div className="mt-4 mb-8 text-center">
                <h2 className="text-xl font-bold mb-2">Informations du Patient</h2>
                <p><strong>Nom:</strong> {patient.name}</p>
                <p><strong>Address:</strong> {patient.address}</p>
                <p><strong>Date de naissance:</strong> {patient.birthdate}</p>
                <p><strong>Age:</strong> {new Date().getFullYear() - new Date(patient.birthdate).getFullYear()}</p>
                {/* Lien pour enregistrer une nouvelle vaccination */}
                <Link
                    to={`/create-vaccination/${patient.id}`}
                    className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Enregistrer une nouvelle vaccination
                </Link>
            </div>
            
            {/* Tableau des vaccinations du patient */}
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">Vaccins</h1>
            <div className="overflow-x-auto">
                <table className="w-fit bg-white mx-auto rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Nom</th>
                            <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Date</th>
                            <th className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Affiche chaque vaccination du patient */}
                        {patientVaccinationDetails.map((vaccination, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                <td className="px-4 py-1 border-b">{vaccination.vaccineName}</td>
                                <td className="px-4 py-1 border-b">{vaccination.vaccineDate}</td>
                                <td className="px-4 py-1 border-b">
                                    {/* Bouton pour supprimer la vaccination */}
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mr-2"
                                        onClick={() => handleDelete(vaccination.id)}
                                    >
                                        Supprimer
                                    </button>
                                    {/* Bouton pour éditer la vaccination */}
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                        onClick={() => handleEdit(vaccination.id)}
                                    >
                                        Éditer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default VaccinationPatient