import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVaccin = () => {
    const { id } = useParams(); // id du vaccin à éditer (récupéré depuis l'URL)
    const navigate = useNavigate(); // Utilisé pour rediriger après la modification

    // États pour stocker les données du vaccin et les champs du formulaire
    const [vaccin, setVaccin] = useState(null); // Stocke les données du vaccin à éditer
    const [name, setName] = useState(''); // Champ pour le nom du vaccin
    const [fabricant, setFabricant] = useState(''); // Champ pour le fabricant
    const [price, setPrice] = useState(''); // Champ pour le prix
    const [showToast, setShowToast] = useState(false); // Contrôle l'affichage du toast de succès

    // Effet pour charger les infos du vaccin à éditer lors du montage du composant ou changement d'id
    useEffect(() => {
        fetch(`http://localhost:3001/vaccins/${id}`)
            .then(res => res.json())
            .then(data => {
                setVaccin(data); // Stocke toutes les infos du vaccin
                setName(data.name); // Remplit le champ nom
                setFabricant(data.fabricant); // Remplit le champ fabricant
                setPrice(data.price); // Remplit le champ prix
            });
    }, [id]);

    // Fonction pour gérer la soumission du formulaire d'édition
    const handleSubmit = (e) => {
        e.preventDefault();
        // Prépare l'objet vaccin mis à jour à envoyer à l'API
        const updatedVaccin = {
            ...vaccin,
            name,
            fabricant,
            price
        };
        // Envoie la requête PUT pour mettre à jour le vaccin
        fetch(`http://localhost:3001/vaccins/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVaccin)
        })
        .then(res => res.json())
        .then(() => {
            setShowToast(true); // Affiche le toast de succès
            setTimeout(() => {
                setShowToast(false);
                navigate('/vaccins'); // Redirige vers la liste des vaccins
            }, 1800);
        });
    };

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!vaccin) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Vaccin mis à jour avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-syringe mr-2 text-blue-500"></i>
                    Éditer le vaccin
                </h2>
                {/* Formulaire d'édition du vaccin */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Nom</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            placeholder="Nom du vaccin"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Fabricant</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="text"
                            value={fabricant}
                            onChange={e => setFabricant(e.target.value)}
                            required
                            placeholder="Fabricant"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-semibold text-blue-700">Prix (€)</label>
                        <input
                            className="w-full border border-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                            min="0"
                            step="0.01"
                            placeholder="Prix"
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

export default EditVaccin;