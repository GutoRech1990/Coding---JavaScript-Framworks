const JobPage = () => {
    return (
        <div>
            <section>
                <div className="container m-auto py-6 px-6">
                    <a
                        href="/jobs.html"
                        className="text-red-500 hover:text-red-600 flex items-center"
                    >
                        <i className="fas fa-arrow-left mr-2"></i> Revenir à la liste des jobs
                    </a>
                </div>
            </section>

            <section className="bg-red-50">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                        <main>
                            <div
                                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                            >
                                <div className="text-gray-500 mb-4">Temps plein</div>
                                <h1 className="text-3xl font-bold mb-4">
                                    Développeur React Senior
                                </h1>
                                <div
                                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                                >
                                    <i
                                        className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                                    ></i>
                                    <p className="text-orange-700">Kirchberg, Luxembourg</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-red-800 text-lg font-bold mb-6">
                                    Description
                                </h3>

                                <p className="mb-4">
                                    Nous recherchons un développeur talentueux pour rejoindre notre équipe. Le candidat idéal doit avoir de solides compétences en HTML, CSS et JavaScript, avec une expérience d'au moins 10 ans avec le framework JavaScript React.
                                </p>

                                <h3 className="text-red-800 text-lg font-bold mb-2">Salaire</h3>

                                <p className="mb-4">€70K - €80K / an</p>
                            </div>
                        </main>

                        {/* <!-- Sidebar --> */}
                        <aside>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold mb-6">Entreprise</h3>

                                <h2 className="text-2xl">Tech Corp</h2>

                                <p className="my-2">
                                    Tech Corp est une entreprise technologique de premier plan spécialisée dans le développement Web et les solutions numériques. Nous sommes fiers de fournir des produits et des services de haute qualité à nos clients tout en favorisant un environnement de travail collaboratif et innovant.
                                </p>

                                <hr className="my-4" />

                                <h3 className="text-xl">Email:</h3>

                                <p className="my-2 bg-red-100 p-2 font-bold">
                                    contact@loremipsum.com
                                </p>

                                <h3 className="text-xl">Téléphone:</h3>

                                <p className="my-2 bg-red-100 p-2 font-bold">1111-111-1111</p>
                            </div>


                            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                <h3 className="text-xl font-bold mb-6">Gestion</h3>
                                <a
                                    href="/add-job.html"
                                    className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >Editer job</a
                                >
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                >
                                    Supprimer job
                                </button>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JobPage