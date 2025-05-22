import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewPatient = () => {
    const navigate = useNavigate();
    // États pour les champs du formulaire
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [showToast, setShowToast] = useState(false);

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
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/patients');
            }, 1800);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Patient créé avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-user-plus mr-2 text-blue-500"></i>
                    Créer un nouveau patient
                </h2>
                {/* Formulaire de création de patient */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Nom</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            placeholder="Nom du patient"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Adresse</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                            placeholder="Adresse"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Date de naissance</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="date"
                            value={birthdate}
                            onChange={e => setBirthdate(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all duration-200"
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Enregistrer le patient
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewPatient;