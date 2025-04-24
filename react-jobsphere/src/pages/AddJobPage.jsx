

const AddJobPage = () => {
    return (
        <div>
            <section class="bg-red-50">
                <div class="container m-auto max-w-2xl py-24">
                    <div
                        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                    >
                        <form>
                            <h2 class="text-3xl text-center font-semibold mb-6">Ajouter Job</h2>

                            <div class="mb-4">
                                <label for="type" class="block text-gray-700 font-bold mb-2"
                                >Type de job</label
                                >
                                <select
                                    id="type"
                                    name="type"
                                    class="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="Temps-Plein">Temps plein</option>
                                    <option value="Mi-Temps">Mi-temps</option>
                                    <option value="Télétravail">Télétravail</option>
                                    <option value="Stage">Stage</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="block text-gray-700 font-bold mb-2"
                                >Titre</label
                                >
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    class="border rounded w-full py-2 px-3 mb-2"
                                    placeholder="ex: Développeur..."
                                    required
                                />
                            </div>

                            <div class="mb-4">
                                <label
                                    for="description"
                                    class="block text-gray-700 font-bold mb-2"
                                >Description</label
                                >
                                <textarea
                                    id="description"
                                    name="description"
                                    class="border rounded w-full py-2 px-3"
                                    rows="4"
                                    placeholder="toute info relative au job..."
                                ></textarea>
                            </div>

                            <div class="mb-4">
                                <label for="type" class="block text-gray-700 font-bold mb-2"
                                >Salaire</label
                                >
                                <select
                                    id="salary"
                                    name="salary"
                                    class="border rounded w-full py-2 px-3"
                                    required
                                >
                                    <option value="Moins €50K">Moins de €50K</option>
                                    <option value="€50K - 60K">€50K - €60K</option>
                                    <option value="€60K - 70K">€60K - €70K</option>
                                    <option value="€70K - 80K">€70K - €80K</option>
                                    <option value="€80K - 90K">€80K - €90K</option>
                                    <option value="€90K - 100K">€90K - €100K</option>
                                    <option value="€100K - 125K">€100K - €125K</option>
                                    <option value="€125K - 150K">€125K - €150K</option>
                                    <option value="€150K - 175K">€150K - €175K</option>
                                    <option value="€175K - 200K">€175K - €200K</option>
                                    <option value="Plus €200K">Plus de €200K</option>
                                </select>
                            </div>

                            <div class='mb-4'>
                                <label class='block text-gray-700 font-bold mb-2'>
                                    Lieu
                                </label>
                                <input
                                    type='text'
                                    id='location'
                                    name='location'
                                    class='border rounded w-full py-2 px-3 mb-2'
                                    placeholder='Emplacement Entreprise'
                                    required
                                />
                            </div>

                            <h3 class="text-2xl mb-5">Information entreprise</h3>

                            <div class="mb-4">
                                <label for="company" class="block text-gray-700 font-bold mb-2"
                                >Nom de l'entreprise</label
                                >
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    class="border rounded w-full py-2 px-3"
                                    placeholder="Nom de l'entreprise"
                                />
                            </div>

                            <div class="mb-4">
                                <label
                                    for="company_description"
                                    class="block text-gray-700 font-bold mb-2"
                                >Description de l'entreprise</label
                                >
                                <textarea
                                    id="company_description"
                                    name="company_description"
                                    class="border rounded w-full py-2 px-3"
                                    rows="4"
                                    placeholder="Que fait l'entreprise?"
                                ></textarea>
                            </div>

                            <div class="mb-4">
                                <label
                                    for="contact_email"
                                    class="block text-gray-700 font-bold mb-2"
                                >Email de contact</label
                                >
                                <input
                                    type="email"
                                    id="contact_email"
                                    name="contact_email"
                                    class="border rounded w-full py-2 px-3"
                                    placeholder="email"
                                    required
                                />
                            </div>

                            <div class="mb-4">
                                <label
                                    for="contact_phone"
                                    class="block text-gray-700 font-bold mb-2"
                                >Téléphone</label
                                >
                                <input
                                    type="tel"
                                    id="contact_phone"
                                    name="contact_phone"
                                    class="border rounded w-full py-2 px-3"
                                    placeholder="téléphone"
                                />
                            </div>

                            <div>
                                <button
                                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Ajouter Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddJobPage