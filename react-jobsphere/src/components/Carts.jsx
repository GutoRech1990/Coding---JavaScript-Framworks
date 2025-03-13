import React from 'react'
import Cart from './Cart'

const Carts = () => {
    return (
        <section className="py-4">
            <div className="container-xl lg:container m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <Cart>
                        <h2 className="text-2xl font-bold">Pour les développeurs</h2>
                        <p className="mt-2 mb-4">
                            Parcourez nos offres d'emploi et démarrez votre carrière dès
                            aujourd'hui
                        </p>
                        <a
                            href="/jobs.html"
                            className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
                        >
                            Parcourir jobs
                        </a>
                    </Cart>
                    <Cart bg="bg-red-100">
                        <h2 className="text-2xl font-bold">Pour les employeurs</h2>
                        <p className="mt-2 mb-4">
                            Ajoutez un poste pour trouver le développeur idéal
                        </p>
                        <a
                            href="/add-job.html"
                            className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                        >
                            Ajouter un job
                        </a>
                    </Cart>
                </div>
            </div>
        </section>
    )
}

export default Carts