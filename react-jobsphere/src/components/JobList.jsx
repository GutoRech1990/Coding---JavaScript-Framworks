import React from 'react'

const JobList = ({ children }) => {
    return (
        <div>
            <section className="bg-red-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {children}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default JobList