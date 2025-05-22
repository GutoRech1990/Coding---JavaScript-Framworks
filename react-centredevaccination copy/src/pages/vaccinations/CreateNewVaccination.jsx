import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateNewVaccination = () => {
    const { id } = useParams(); // Récupère l'id du patient depuis l'URL
    const navigate = useNavigate();
    const [vaccins, setVaccins] = useState([]); // Stocke la liste des vaccins
    const [selectedVaccine, setSelectedVaccine] = useState(''); // Champ pour le vaccin sélectionné
    const [showToast, setShowToast] = useState(false);

    // Obtenir la date d'aujourd'hui au format YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Effet pour charger la liste des vaccins depuis l'API lors du montage du composant
    useEffect(() => {
        fetch('http://localhost:3001/vaccins')
            .then(res => res.json())
            .then(data => {
                setVaccins(data); // Stocke la liste des vaccins
                if (data.length > 0) setSelectedVaccine(data[0].id); // Sélectionne le premier vaccin par défaut
            });
    }, []);

    // Fonction pour gérer la soumission du formulaire de création de vaccination
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prépare l'objet vaccination à envoyer à l'API
        const newVaccination = {
            patient_id: id, // Toujours string pour cohérence avec le backend
            vaccin_id: selectedVaccine, // Toujours string pour cohérence avec le backend
            vaccination_date: today // Date du jour
        };
        // Envoie la nouvelle vaccination à l'API json-server
        fetch('http://localhost:3001/vaccinations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVaccination)
        })
        .then(res => res.json())
        .then(() => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate(`/vaccination/${id}`);
            }, 1800);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Vaccination enregistrée avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-syringe mr-2 text-blue-500"></i>
                    Enregistrer une nouvelle vaccination
                </h2>
                {/* Formulaire de création de vaccination */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Vaccin</label>
                        <select
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            value={selectedVaccine}
                            onChange={e => setSelectedVaccine(e.target.value)}
                            required
                        >
                            {vaccins.map(vaccine => (
                                <option key={vaccine.id} value={vaccine.id}>
                                    {vaccine.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Date</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
                            type="date"
                            value={today}
                            readOnly
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-full shadow-lg font-semibold text-lg hover:scale-105 hover:from-green-600 hover:to-green-700 transition-all duration-200"
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i>
                        Enregistrer la vaccination
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewVaccination;