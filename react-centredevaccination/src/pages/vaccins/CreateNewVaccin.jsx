import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewVaccin = () => {
    const navigate = useNavigate();
    // États pour les champs du formulaire
    const [name, setName] = useState('');
    const [fabricant, setFabricant] = useState('');
    const [price, setPrice] = useState('');

    // Fonction pour gérer la soumission du formulaire de création de vaccin
    const handleSubmit = (e) => {
        e.preventDefault();
        // Création de l'objet vaccin à envoyer à l'API
        const newVaccin = {
            name,
            fabricant,
            price: parseFloat(price) // S'assure que le prix est bien un nombre
        };
        // Envoie du nouveau vaccin à l'API json-server
        fetch('http://localhost:3001/vaccins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVaccin)
        })
        .then(res => res.json())
        .then(() => {
            alert("Vaccin créé avec succès !");
            // Redirige vers la liste des vaccins après la création
            navigate('/vaccins');
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4 text-center">Créer un nouveau vaccin</h2>
            {/* Formulaire de création de vaccin */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Nom</label>
                    {/* Champ pour le nom du vaccin */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Fabricant</label>
                    {/* Champ pour le fabricant du vaccin */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="text"
                        value={fabricant}
                        onChange={e => setFabricant(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Prix</label>
                    {/* Champ pour le prix du vaccin */}
                    <input
                        className="w-full border px-3 py-2 rounded"
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                {/* Bouton pour enregistrer le nouveau vaccin */}
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                    Enregistrer le vaccin
                </button>
            </form>
        </div>
    );
};

export default CreateNewVaccin;