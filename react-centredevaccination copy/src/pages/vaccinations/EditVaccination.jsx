import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVaccination = () => {
    const { id } = useParams(); // id de la vaccination à éditer (récupéré depuis l'URL)
    const navigate = useNavigate();
    const [vaccination, setVaccination] = useState(null); // Stocke les données de la vaccination à éditer
    const [vaccins, setVaccins] = useState([]); // Stocke la liste de tous les vaccins
    const [selectedVaccine, setSelectedVaccine] = useState(''); // Champ pour le vaccin sélectionné
    const [date, setDate] = useState(''); // Champ pour la date de vaccination
    const [showToast, setShowToast] = useState(false); // Contrôle l'affichage du toast de succès

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
            setShowToast(true); // Affiche le toast de succès
            setTimeout(() => {
                setShowToast(false);
                navigate(`/vaccination/${vaccination.patient_id}`); // Redirige vers la page des vaccinations du patient
            }, 1800);
        });
    };

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!vaccination) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Vaccination mise à jour avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-syringe mr-2 text-blue-500"></i>
                    Éditer la vaccination
                </h2>
                {/* Formulaire d'édition de la vaccination */}
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
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
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

export default EditVaccination;