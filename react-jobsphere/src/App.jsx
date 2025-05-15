import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, {jobLoader} from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";




const App = () => {
  // Ajouter nouveau job
  const addJob = async (newJob) => {
    const res = await fetch("http://localhost:8000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  }

  // Suprimer un job
  const deleteJob = async (id) => {
    const res = await fetch(`http://localhost:8000/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  }

  // Editer un job
  const editJob = async (newEditJob) => {
    const res = await fetch(`http://localhost:8000/jobs/${newEditJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEditJob),
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="/jobs" element={<JobsPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
        <Route path="/job/:id" element={<JobPage deleteJob={deleteJob}/>}loader={jobLoader}/>
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path="/edit-job/:id" element={<EditJobPage modifierJobSubmit={editJob}/>} loader={jobLoader}/>
      </Route>
      
    )
  );
  return <RouterProvider router={router}/>
};

export default App;
