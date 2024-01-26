import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ title, year, imdbID, type, poster }) => {
  return (
    <Link to={`/movie/${title}`} className="text-white">
      <div className="max-w-xs rounded overflow-hidden shadow-lg hover:shadow-xl transition duration-300 cursor-pointer">
        <img className="w-full" src={poster} alt={title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className=" text-gray-200 text-base">Year: {year}</p>
          <p className="text-gray-200 text-base">Type: {type}</p>
          <p className="text-gray-200 text-base">IMDb ID: {imdbID}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
