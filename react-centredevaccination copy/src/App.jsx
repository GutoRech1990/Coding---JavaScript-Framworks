import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import IndexPatients from "./pages/patients/IndexPatients";
import IndexVaccins from './pages/vaccins/IndexVaccins';
import VaccinationPatient from './pages/vaccinations/VaccinationPatient';
import CreateNewVaccination from './pages/vaccinations/CreateNewVaccination';
import EditVaccination from './pages/vaccinations/EditVaccination';
import EditPatients from './pages/patients/EditPatients';
import CreateNewPatient from './pages/patients/CreateNewPatient';
import EditVaccin from './pages/vaccins/EditVaccin';
import CreateNewVaccin from './pages/vaccins/CreateNewVaccin';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="patients" element={<IndexPatients/>}/>
        <Route path="vaccins" element={<IndexVaccins/>}/>
        <Route path="vaccination/:id" element={<VaccinationPatient/>}/>
        <Route path="create-vaccination/:id" element={<CreateNewVaccination/>}/>
        <Route path="edit-vaccination/:id" element={<EditVaccination/>}/>
        <Route path="edit-patient/:id" element={<EditPatients/>}/>
        <Route path="create-patient" element={<CreateNewPatient/>}/>
        <Route path="edit-vaccin/:id" element={<EditVaccin/>}/>
        <Route path="create-vaccin" element={<CreateNewVaccin/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router}/>
}

export default App
