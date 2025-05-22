import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateNewVaccination = () => {
    const { id } = useParams(); // Récupère l'id du patient depuis l'URL
    const navigate = useNavigate();
    const [vaccins, setVaccins] = useState([]); // Stocke la liste des vaccins
    const [selectedVaccine, setSelectedVaccine] = useState(''); // Champ pour le vaccin sélectionné

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
            alert("Vaccination enregistrée !");
            // Redirige vers la page des vaccinations du patient après la création
            navigate(`/vaccination/${id}`);
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Enregistrer une nouvelle vaccination</h2>
            {/* Formulaire de création de vaccination */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Vaccin</label>
                    {/* Menu déroulant pour choisir le vaccin */}
                    <select
                        className="w-full border px-3 py-2 rounded"
                        value={selectedVaccine}
                        onChange={e => setSelectedVaccine(e.target.value)}
                        required
                    >
                        {/* Affiche la liste des vaccins disponibles */}
                        {vaccins.map(vaccine => (
                            <option key={vaccine.id} value={vaccine.id}>
                                {vaccine.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Date</label>
                    {/* Champ de date en lecture seule, fixé à aujourd'hui */}
                    <input
                        className="w-full border px-3 py-2 rounded bg-gray-100"
                        type="date"
                        value={today}
                        readOnly
                    />
                </div>
                {/* Bouton pour enregistrer la vaccination */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Enregistrer la vaccination
                </button>
            </form>
        </div>
    );
};

export default CreateNewVaccination;