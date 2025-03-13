import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Carts from "./components/Carts";
import JobListItem from "./components/JobListItem";


const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Carts />
      <JobListItem/>
    </>
  );
};

export default App;
