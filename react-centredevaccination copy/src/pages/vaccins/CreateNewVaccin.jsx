import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateNewVaccin = () => {
    const navigate = useNavigate();
    // États pour les champs du formulaire et le toast de succès
    const [name, setName] = useState('');
    const [fabricant, setFabricant] = useState('');
    const [price, setPrice] = useState('');
    const [showToast, setShowToast] = useState(false);

    // Fonction pour gérer la soumission du formulaire de création de vaccin
    const handleSubmit = (e) => {
        e.preventDefault();
        const newVaccin = {
            name,
            fabricant,
            price: parseFloat(price)
        };
        // Envoie le nouveau vaccin à l'API json-server
        fetch('http://localhost:3001/vaccins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newVaccin)
        })
        .then(res => res.json())
        .then(() => {
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                navigate('/vaccins');
            }, 1800);
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-12">
            {/* Toast de succès */}
            {showToast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
                    <i className="fa-solid fa-circle-check"></i>
                    Vaccin créé avec succès !
                </div>
            )}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-800 drop-shadow">
                    <i className="fa-solid fa-syringe mr-2 text-blue-500"></i>
                    Créer un nouveau vaccin
                </h2>
                {/* Formulaire de création de vaccin */}
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
                        Enregistrer le vaccin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNewVaccin;