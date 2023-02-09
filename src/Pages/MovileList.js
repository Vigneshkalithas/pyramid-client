import React, { useEffect, useState } from "react";
import "../Styles/MovieList.css";
// import { movies } from "../Helper/movies";
import MovieCard from "../Component/MovieCard";
import axios from "axios";
import { Api } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { toast } from "react-toastify";

function MovileList() {
  const [movies, SetMovies] = useState([]);
  const [token, setToken] = useState();
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      localStorage.clear();
      const values = { token: token };
      let result = await axios.post(`${Api.api}/admin/logout`, values);
      // console.log(result.data.error);
      toast.success(result.data.message);
      navigate("/");
    } catch (error) {
      console.log(error);
    }

    // if(result){

    // }
  };
  let fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log(headers);
      let result = await axios.get(`${Api.api}/movies/getall`, {
        headers: headers,
      });
      SetMovies(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  // const myTimeout = setTimeout(fetchData, 2000);

  useEffect(() => {
    const Tok = localStorage.getItem("token");
    setToken(Tok);
    // myTimeout();
    fetchData();

    if (!Tok) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <div className="movileListHead">
        <h1>Movile Lists</h1>
      </div>

      <div className="movie-list">
        {movies.map((mv, index) => (
          <MovieCard
            key={index}
            movie={mv}
            id={index}
            // onClick={() => navigate("/movies/" + mv._id)}
          />
        ))}
      </div>
      <div className="logouthead">
        <button className="logout" onClick={() => Logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default MovileList;
