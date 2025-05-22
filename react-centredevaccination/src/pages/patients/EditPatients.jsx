import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPatients = () => {
    const { id } = useParams(); // Récupère l'id du patient depuis l'URL
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null); // Stocke les données du patient à éditer
    const [name, setName] = useState(''); // Champ pour le nom du patient
    const [address, setAddress] = useState(''); // Champ pour l'adresse du patient
    const [birthdate, setBirthdate] = useState(''); // Champ pour la date de naissance

    // Effet pour charger les informations du patient lors du montage ou changement d'id
    useEffect(() => {
        fetch(`http://localhost:3001/patients/${id}`)
            .then(res => res.json())
            .then(data => {
                setPatient(data); // Stocke toutes les infos du patient
                setName(data.name); // Remplit le champ nom
                setAddress(data.address); // Remplit le champ adresse
                setBirthdate(data.birthdate); // Remplit le champ date de naissance
            });
    }, [id]);

    // Fonction pour gérer la soumission du formulaire d'édition
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prépare l'objet patient mis à jour à envoyer à l'API
        const updatedPatient = {
            ...patient,
            name,
            address,
            birthdate
        };
        // Envoie la requête PUT pour mettre à jour le patient
        fetch(`http://localhost:3001/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPatient)
        })
        .then(res => res.json())
        .then(() => {
            alert("Patient mis à jour !");
            // Redirige vers la liste des patients après modification
            navigate('/patients');
        });
    };

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!patient) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Éditer le patient</h2>
            {/* Formulaire d'édition du patient */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Nom</label>
                    {/* Champ pour modifier le nom du patient */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Adresse</label>
                    {/* Champ pour modifier l'adresse du patient */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Date de naissance</label>
                    {/* Champ pour modifier la date de naissance */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="date"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        required
                    />
                </div>
                {/* Bouton pour enregistrer les modifications */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Enregistrer les modifications
                </button>
            </form>
        </div>
    );
};

export default EditPatients;