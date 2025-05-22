import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVaccination = () => {
    const { id } = useParams(); // id de la vaccination à éditer (récupéré depuis l'URL)
    const navigate = useNavigate();
    const [vaccination, setVaccination] = useState(null); // Stocke les données de la vaccination à éditer
    const [vaccins, setVaccins] = useState([]); // Stocke la liste de tous les vaccins
    const [selectedVaccine, setSelectedVaccine] = useState(''); // Champ pour le vaccin sélectionné
    const [date, setDate] = useState(''); // Champ pour la date de vaccination

    // Effet pour charger la vaccination et la liste des vaccins lors du montage ou changement d'id
    useEffect(() => {
        // Charger la vaccination à éditer
        fetch(`http://localhost:3001/vaccinations/${id}`)
            .then(res => res.json())
            .then(data => {
                setVaccination(data); // Stocke toutes les infos de la vaccination
                setSelectedVaccine(data.vaccin_id); // Remplit le champ vaccin sélectionné
                setDate(data.vaccination_date); // Remplit le champ date
            });

        // Charger la liste complète des vaccins pour le menu déroulant
        fetch('http://localhost:3001/vaccins')
            .then(res => res.json())
            .then(data => setVaccins(data));
    }, [id]);

    // Fonction pour gérer la soumission du formulaire d'édition de vaccination
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prépare l'objet vaccination mis à jour à envoyer à l'API
        const updatedVaccination = {
            ...vaccination,
            vaccin_id: String(selectedVaccine), // Toujours string pour cohérence avec le backend
            vaccination_date: date
        };
        // Envoie la requête PUT pour mettre à jour la vaccination
        fetch(`http://localhost:3001/vaccinations/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVaccination)
        })
        .then(res => res.json())
        .then(() => {
            alert("Vaccination mise à jour !");
            // Redirige vers la page du patient après modification
            navigate(`/vaccination/${vaccination.patient_id}`);
        });
    };

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!vaccination) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Éditer la vaccination</h2>
            {/* Formulaire d'édition de la vaccination */}
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
                        {vaccins.map(vaccine => (
                            <option key={vaccine.id} value={vaccine.id}>
                                {vaccine.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Date</label>
                    {/* Champ pour modifier la date de vaccination */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
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

export default EditVaccination;