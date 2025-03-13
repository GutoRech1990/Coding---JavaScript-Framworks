import React from 'react'

const JobList = ({ children }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
                Parcourir jobs
            </h2>
            <section className="bg-red-50 px-4 py-10">
                {children}
            </section>
        </div>
    )
}

export default JobList