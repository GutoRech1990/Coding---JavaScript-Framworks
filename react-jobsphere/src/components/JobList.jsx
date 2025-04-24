import React from 'react'
import { useState } from 'react'
import {FaLocationDot} from 'react-icons/fa6'

const JobList = ({ job }) => {
    const [showFullDesc, setShowFullDesc] = useState(false);
    let description = job.description;
    if (!showFullDesc) {
        description = description.substring(0, 90) + '...';
    }
    return (
        <div>
            <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">
                    <div className="mb-6">
                        <div className="text-gray-600 my-2">{job.type}</div>
                        <h3 className="text-xl font-bold">
                            {job.title}
                        </h3>
                    </div>

                    <div className="mb-5">
                        {description}
                    </div>

                    <button className='text-red-500 mb-2 cursor-pointer hover:text-red-900' onClick={() => setShowFullDesc((prev) => !prev)}>{showFullDesc ? "Moins" : "Plus"}</button>

                    <h3 className="text-red-500 mb-2">{job.salary} / an</h3>

                    <div className="border border-gray-100 mb-5"></div>

                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                        <div className="text-orange-700 mb-3">
                            <FaLocationDot className="inline mr-1 mb-1"/>
                            {job.location}
                        </div>
                        <a
                            href="/job"
                            className="h-[36px] bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                        >
                            Lire plus
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobList