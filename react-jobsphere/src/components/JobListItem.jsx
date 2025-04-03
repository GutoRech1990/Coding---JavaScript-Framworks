import React from 'react'
import JobList from './JobList'
import { useState, useEffect } from 'react'
import Spinner from './Spinner'


const JobListItem = ({ isHome = false }) => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/jobs");
                const result = await response.json();
                setJobs(result);
            }
            catch (error) {
                console.log(error);
            } 
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])
    const titre = isHome ? "Jobs recent" : "Liste des jobs";
    return (
        <div>
            <section className="bg-red-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
                        {titre}
                    </h2>
                        {loading ? (<Spinner loading={loading}/>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">{jobs.map((job) => (
                            <JobList key={job.id} job={job} />
                        ))}</div>)}
                </div>
            </section>
        </div>

    )
}

export default JobListItem