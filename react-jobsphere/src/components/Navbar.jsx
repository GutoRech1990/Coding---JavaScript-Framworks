import React from "react";
import logo from "../assets/images/react-logo.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const navClass = ({isActive})=> 
        isActive 
        ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2" 
        : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";
        
    return (
        <nav className="bg-red-700 border-b border-red-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        {/* <!-- Logo --> */}
                        <Link
                            className="flex flex-shrink-0 items-center mr-4"
                            to="/"
                        >
                            <img className="h-10 w-auto" src={logo} alt="JobSphere" />
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">
                                JobSphere
                            </span>
                        </Link>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <NavLink
                                    to="/"
                                    className={navClass}
                                >
                                    Acceuil
                                </NavLink>
                                <NavLink
                                    to="/jobs"
                                    className={navClass}
                                >
                                    Jobs
                                </NavLink>
                                <NavLink
                                    to="/add-job"
                                    className={navClass}
                                >
                                    Ajouter Job
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
