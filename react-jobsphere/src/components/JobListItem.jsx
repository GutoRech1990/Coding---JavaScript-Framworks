import React from 'react'
import JobList from './JobList'

const JobListItem = () => {
    return (
        <div>
            
            <JobList>
                <div className="bg-white rounded-xl shadow-md relative">
                    <div className="p-4">
                        <div className="mb-6">
                            <div className="text-gray-600 my-2">Temps plein</div>
                            <h3 className="text-xl font-bold">
                                Développeur React Senior
                            </h3>
                        </div>

                        <div className="mb-5">
                            We are seeking a talented Front-End Developer to join our team
                            in Boston, MA. The ideal candidate will have strong skills in
                            HTML, CSS, and JavaScript...
                        </div>

                        <h3 className="text-red-500 mb-2">€70K - €80K / an</h3>

                        <div className="border border-gray-100 mb-5"></div>

                        <div className="flex flex-col lg:flex-row justify-between mb-4">
                            <div className="text-orange-700 mb-3">
                                <i className="fa-solid fa-location-dot text-lg"></i>
                                Kirchberg, Luxembourg
                            </div>
                            <a
                                href="job.html"
                                className="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                            >
                                Lire plus
                            </a>
                        </div>
                    </div>
                </div>
            </JobList>
            <JobList>
                <div className="bg-white rounded-xl shadow-md relative">
                    <div className="p-4">
                        <div className="mb-6">
                            <div className="text-gray-600 my-2">Télétravail</div>
                            <h3 className="text-xl font-bold">
                                Développeur front-end (Angular)
                            </h3>
                        </div>

                        <div className="mb-5">
                            Rejoignez notre équipe en tant que développeur front-end dans
                            la ville ensoleillée de Barcelone. Nous recherchons une
                            personne motivée et passionnée.
                        </div>

                        <h3 className="text-red-500 mb-2">€70K - €80K / an</h3>

                        <div className="border border-gray-100 mb-5"></div>

                        <div className="flex flex-col lg:flex-row justify-between mb-4">
                            <div className="text-orange-700 mb-3">
                                <i className="fa-solid fa-location-dot text-lg"></i>
                                Barcelone, Espagne
                            </div>
                            <a
                                href="job.html"
                                className="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                            >
                                Lire plus
                            </a>
                        </div>
                    </div>
                </div>
            </JobList>
            <JobList>
                <div className="bg-white rounded-xl shadow-md relative">
                    <div className="p-4">
                        <div className="mb-6">
                            <div className="text-gray-600 my-2">Télétravail</div>
                            <h3 className="text-xl font-bold">
                                Développeur back-end (C#)
                            </h3>
                        </div>

                        <div className="mb-5">
                            Vous êtes passionné par le développement back-end ? Rejoignez
                            notre équipe dans la ville dynamique de Lisbonne, et
                            travaillez sur des projets passionnants qui font la
                            différence.
                        </div>

                        <h3 className="text-red-500 mb-2">€70K - €80K / an</h3>

                        <div className="border border-gray-100 mb-5"></div>

                        <div className="flex flex-col lg:flex-row justify-between mb-4">
                            <div className="text-orange-700 mb-3">
                                <i className="fa-solid fa-location-dot text-lg"></i>
                                Lisbonne, Portugal
                            </div>
                            <a
                                href="job.html"
                                className="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                            >
                                Lire plus
                            </a>
                        </div>
                    </div>
                </div>
            </JobList>
        </div>

    )
}

export default JobListItem