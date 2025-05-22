import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPatients = () => {
    const { id } = useParams(); // Récupère l'id du patient depuis l'URL
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null); // Stocke les données du patient à éditer
    const [name, setName] = useState(''); // Champ pour le nom du patient
    const [address, setAddress] = useState(''); // Champ pour l'adresse du patient
    const [birthdate, setBirthdate] = useState(''); // Champ pour la date de naissance
    const [showToast, setShowToast] = useState(false);

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
        const updatedPatient = {
            ...patient,
            name,
            address,
            birthdate
        };
        fetch(`http://localhost:3001/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPatient)
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

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!patient) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Patient mis à jour avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-user-pen mr-2 text-blue-500"></i>
                    Édition du patient
                </h2>
                {/* Formulaire d'édition du patient */}
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
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditPatients;