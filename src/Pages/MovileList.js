import React, { useEffect, useState } from "react";
import "../Styles/MovieList.css";
// import { movies } from "../Helper/movies";
import MovieCard from "../Component/MovieCard";
import axios from "axios";
import { Api } from "../Api/Api";
import { useNavigate } from "react-router-dom";

function MovileList() {
  const [movies, SetMovies] = useState([]);
  const navigate = useNavigate();

  let fetchData = async () => {
    try {
      const token = "iamUsingSecrityWord";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      let result = await axios.get(`${Api.api}/movies/getall`, {
        headers: headers,
      });
      SetMovies(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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
    </div>
  );
}

export default MovileList;
