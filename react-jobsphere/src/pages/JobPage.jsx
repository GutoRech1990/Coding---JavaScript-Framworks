import { Link, useNavigate, useParams } from "react-router-dom"
import { FaLocationDot, FaArrowLeft } from 'react-icons/fa6'
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"

const JobPage = ({deleteJob}) => {
    const [job, setJob] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const navigate = useNavigate();

    const onDeleteClick = (jobId) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce job ?"));
        if (!confirm) return;
        deleteJob(jobId);
        return navigate("/jobs");
        }
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/jobs/${id}`);
                const result = await response.json();
                console.log(result);
                setJob(result);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    });
    return (
        <div>
            {loading ? (
                <Spinner loading={loading} />
            ) : (
                <>
                    <section>
                        <div className="container m-auto py-6 px-6">
                            <Link
                                to="/jobs"
                                className="text-red-500 hover:text-red-600 flex items-center"
                            >
                                <FaArrowLeft className="mr-2"></FaArrowLeft> Revenir à la liste des jobs
                            </Link>
                        </div>
                    </section>

                    <section className="bg-red-50">
                        <div className="container m-auto py-10 px-6">
                            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                <main>
                                    <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                                        <div className="text-gray-500 mb-4">{job?.type}</div>
                                        <h1 className="text-3xl font-bold mb-4">{job?.title}</h1>
                                        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                                            <FaLocationDot className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></FaLocationDot>
                                            <p className="text-orange-700">{job?.location}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <h3 className="text-red-800 text-lg font-bold mb-6">Description</h3>
                                        <p className="mb-4">{job?.description}</p>
                                        <h3 className="text-red-800 text-lg font-bold mb-2">Salaire</h3>
                                        <p className="mb-4">{job?.salary} / an</p>
                                    </div>
                                </main>

                                <aside>
                                    <div className="bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-xl font-bold mb-6">Entreprise</h3>
                                        <h2 className="text-2xl">{job?.company?.name}</h2>
                                        <p className="my-2">{job?.company?.description}</p>
                                        <hr className="my-4" />
                                        <h3 className="text-xl">{job?.company?.contactMail}</h3>
                                        <p className="my-2 bg-red-100 p-2 font-bold">
                                            {job?.company?.contactMail}
                                        </p>
                                        <h3 className="text-xl">Téléphone:</h3>
                                        <p className="my-2 bg-red-100 p-2 font-bold">
                                            {job?.company?.contactPhone}
                                        </p>
                                    </div>

                                    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                                        <h3 className="text-xl font-bold mb-6">Gestion</h3>
                                        <a
                                            href="/add-job.html"
                                            className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                        >
                                            Editer job
                                        </a>
                                        <button onClick={()=> onDeleteClick(job.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                                        >
                                            Supprimer job
                                        </button>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default JobPage