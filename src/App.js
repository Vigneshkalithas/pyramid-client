import "./App.css";
import MovileList from "./Pages/MovileList";
import MovieDetails from "./Pages/MovieDetails";
import { useState } from "react";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <MovileList /> */}

      <Routes>
        <Route path="/" element={<MovileList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
