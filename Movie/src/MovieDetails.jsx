import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const apiUrl = `https://localhost:7003/api/Movie/details?title=${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-8 animate-fade-in">
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <section className="w-11/12 md:w-10/12 mx-auto">
      <div className="text-white p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-4">{movieDetails.title}</h1>
        <div className="flex justify-center mb-4">
          <img
            src={movieDetails.poster}
            alt={movieDetails.title}
            className="rounded-lg shadow-lg"
          />
        </div>
        <p className="text-xl mb-2">Year: {movieDetails.year}</p>
        <p className="text-xl mb-2">Rated: {movieDetails.rated}</p>
        <p className="text-xl mb-2">Released: {movieDetails.released}</p>
        <p className="text-xl mb-2">Runtime: {movieDetails.runtime}</p>
        <p className="text-xl mb-2">Genre: {movieDetails.genre}</p>
        <p className="text-xl mb-2">Director: {movieDetails.director}</p>
        <p className="text-xl mb-2">Writer: {movieDetails.writer}</p>
        <p className="text-xl mb-2">Actors: {movieDetails.actors}</p>
        <p className="text-xl mb-2">Plot: {movieDetails.plot}</p>
        <p className="text-xl mb-2">Language: {movieDetails.language}</p>
        <p className="text-xl mb-2">Country: {movieDetails.country}</p>
        <p className="text-xl mb-2">Awards: {movieDetails.awards}</p>
        <p className="text-xl mb-2">IMDb Rating: {movieDetails.imdbRating}</p>
      </div>
    </section>
  );
}

export default MovieDetails;
