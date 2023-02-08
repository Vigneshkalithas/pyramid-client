import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { movies } from "../Helper/movies";
import "../Styles/MovieDetails.css";
import axios from "axios";
import { Api } from "../Api/Api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  // const navigate = useNavigate();
  // const movie = movies[id];
  let fetchData = async () => {
    try {
      let result = await axios.get(`${Api.api}/movies/getone/${id}`);
      setMovie(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="card-head">
        <div className="MovieCard">
          <div className="img-head">
            <img src={movie.poster} alt="movie-poster" />
          </div>
          <div className="titles">
            <h4>Name : {movie.name}</h4>
            <h6>Screen : {movie.screen}</h6>
            <h6>Rating :{movie.rating}</h6>
            <h6>Languages : {movie.languages}</h6>
            <h6>Certificate : {movie.certificate}</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
