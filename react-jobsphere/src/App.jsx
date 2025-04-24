import React from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/jobs" element={<JobsPage/>}/>
      <Route path="*" element={<NotFoundPage/>}/>
      <Route path="/job/:id" element={<JobPage/>}/>
      <Route path="/add-job" element={<AddJobPage/>}/>
    </Route>
    
  )
);

const App = () => {
  return <RouterProvider router={router}/>
};

export default App;
