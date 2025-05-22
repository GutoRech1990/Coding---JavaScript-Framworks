import React from 'react'

const Navbar = () => {
    return (
        <div>
            <nav className="bg-blue-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Centre de Vaccination <i className="fa-solid fa-syringe"></i></h1>
                    <ul className="flex space-x-4">
                        <li><a href="/vaccins" className="text-white hover:text-blue-200">Vaccins</a></li>
                        <li><a href="/patients" className="text-white hover:text-blue-200">Patients</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar