import "./App.css";
import MovileList from "./Pages/MovileList";
import MovieDetails from "./Pages/MovieDetails";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Login from "./Pages/Login";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* <MovileList /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<MovileList />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
