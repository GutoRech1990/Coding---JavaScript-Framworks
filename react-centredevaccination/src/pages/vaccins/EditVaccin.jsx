import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditVaccin = () => {
    const { id } = useParams(); // id du vaccin à éditer (récupéré depuis l'URL)
    const navigate = useNavigate(); // Utilisé pour rediriger après la modification
    const [vaccin, setVaccin] = useState(null); // Stocke les données du vaccin à éditer
    const [name, setName] = useState(''); // Champ pour le nom du vaccin
    const [fabricant, setFabricant] = useState(''); // Champ pour le fabricant
    const [price, setPrice] = useState(''); // Champ pour le prix

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
        // Prépare l'objet mis à jour à envoyer à l'API
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
            alert("Vaccin mis à jour !");
            navigate('/vaccins'); // Redirige vers la liste des vaccins après modification
        });
    };

    // Affiche un message de chargement si les données ne sont pas encore prêtes
    if (!vaccin) return <div className="p-6 text-center">Chargement...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Éditer le vaccin</h2>
            {/* Formulaire d'édition du vaccin */}
            <form onSubmit={handleSubmit}> 
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Nom</label>
                    {/* Champ pour modifier le nom du vaccin */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={name} // Champ pour le nom du vaccin
                        onChange={e => setName(e.target.value)} // Met à jour le nom
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Fabricant</label>
                    {/* Champ pour modifier le fabricant */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={fabricant} // Champ pour le fabricant du vaccin
                        onChange={e => setFabricant(e.target.value)} // Met à jour le fabricant
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Prix</label>
                    {/* Champ pour modifier le prix */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="number"
                        value={price} // Champ pour le prix du vaccin
                        onChange={e => setPrice(e.target.value)} // Met à jour le prix
                        required
                        min="0"
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

export default EditVaccin;