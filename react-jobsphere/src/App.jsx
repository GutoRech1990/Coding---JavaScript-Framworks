import React from 'react'

const App = () => {
  return (
    <>
      {/* <!-- Barre de navigation --> */}
    <nav className="bg-red-700 border-b border-red-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div
            className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            {/* <!-- Logo --> */}
            <a className="flex flex-shrink-0 items-center mr-4" href="/index.html">
              <img
                className="h-10 w-auto"
                src="images/logo.png"
                alt="JobSphere"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2"
                >JobSphere</span
              >
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <a
                  href="/index.html"
                  className="text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Acceuil</a
                >
                <a
                  href="/jobs.html"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Jobs</a
                >
                <a
                  href="/add-job.html"
                  className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >Ajouter Job</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    {/* <!-- Hero --> */}
    <section className="bg-red-700 py-20 mb-4">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
      >
        <div className="text-center">
          <h1
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            Devenez un développeur
          </h1>
          <p className="my-4 text-xl text-white">
            Trouvez le job idéal pour vous!
          </p>
        </div>
      </div>
    </section>

    {/* <!-- Developpeurs et employeurs --> */}
    <section className="py-4">
	  <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Pour les développeurs</h2>
            <p className="mt-2 mb-4">
              Parcourez nos offres d'emploi et démarrez votre carrière dès aujourd'hui
            </p>
            <a
              href="/jobs.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Parcourir jobs
            </a>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Pour les employeurs</h2>
            <p className="mt-2 mb-4">
              Ajoutez un poste pour trouver le développeur idéal
            </p>
            <a
              href="/add-job.html"
              className="inline-block bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
            >
              Ajouter un job
            </a>
          </div>
        </div>
      </div>
    </section>

	{/* <!-- Parcourir Jobs --> */}
    <section className="bg-red-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-6 text-center">
          Parcourir jobs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* <!-- Job 1 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">Temps plein</div>
                <h3 className="text-xl font-bold">Développeur React Senior</h3>
              </div>

              <div className="mb-5">
               We are seeking a talented Front-End Developer to join our team in Boston, MA. The ideal candidate will have strong skills in HTML, CSS, and JavaScript...
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
		  
          {/* <!-- Job 2 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">Télétravail</div>
                <h3 className="text-xl font-bold">Développeur front-end (Angular)</h3>
              </div>

              <div className="mb-5">
               Rejoignez notre équipe en tant que développeur front-end dans la ville ensoleillée de Barcelone. Nous recherchons une personne motivée et passionnée.
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
		  
          {/* <!-- Job 3 --> */}
          <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
              <div className="mb-6">
                <div className="text-gray-600 my-2">Télétravail</div>
                <h3 className="text-xl font-bold">Développeur back-end (C#)</h3>
              </div>

              <div className="mb-5">
                Vous êtes passionné par le développement back-end ? Rejoignez notre équipe dans la ville dynamique de Lisbonne, et travaillez sur des projets passionnants qui font la différence.
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
        </div>
      </div>
    </section>
    </>
  )
}

export default App