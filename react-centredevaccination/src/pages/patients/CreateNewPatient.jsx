import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewPatient = () => {
    const navigate = useNavigate();
    // États pour les champs du formulaire
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    // Fonction pour gérer la soumission du formulaire de création de patient
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prépare l'objet patient à envoyer à l'API
        const newPatient = {
            name,
            address,
            birthdate
        };
        // Envoie le nouveau patient à l'API json-server
        fetch('http://localhost:3001/patients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPatient)
        })
        .then(res => res.json())
        .then(() => {
            alert("Patient créé avec succès !");
            // Redirige vers la liste des patients après la création
            navigate('/patients');
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Créer un nouveau patient</h2>
            {/* Formulaire de création de patient */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Nom</label>
                    {/* Champ pour le nom du patient */}
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
                    {/* Champ pour l'adresse du patient */}
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
                    {/* Champ pour la date de naissance du patient */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="date"
                        value={birthdate}
                        onChange={e => setBirthdate(e.target.value)}
                        required
                    />
                </div>
                {/* Bouton pour enregistrer le nouveau patient */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Enregistrer le patient
                </button>
            </form>
        </div>
    );
};

export default CreateNewPatient;