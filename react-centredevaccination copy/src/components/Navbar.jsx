import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-400 shadow-lg py-4">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
                <h1 className="text-white text-2xl font-extrabold flex items-center gap-2 drop-shadow">
                    <i className="fa-solid fa-syringe text-green-200"></i>
                    <Link to="/" className="hover:underline">
                        Centre de Vaccination
                    </Link>
                </h1>
                <ul className="flex gap-6 mt-3 sm:mt-0">
                    <li>
                        <a
                            href="/vaccins"
                            className="text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 hover:text-green-200 transition-all duration-200"
                        >
                            Vaccins
                        </a>
                    </li>
                    <li>
                        <a
                            href="/patients"
                            className="text-white font-semibold px-4 py-2 rounded-full hover:bg-blue-700 hover:text-green-200 transition-all duration-200"
                        >
                            Patients
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar