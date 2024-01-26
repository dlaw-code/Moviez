import React from "react";
import MovieCard from "./MovieCard ";

const SearchSection = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  lastSearchQuery,
  loading,
  handleSearch,
}) => {
  return (
    <section className="w-11/12 md:w-10/12 mx-auto pb-12">
      <h2 className="text-center text-3xl mb-8 font-bold">
        Search for a Movie
      </h2>

      <div className="flex justify-center items-center space-x-4">
        <input
          className="p-2 rounded-md border-white bg-black border-2 w-2/3 focus:outline-none focus:border-gray-500 transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-white text-black px-4 py-2 rounded-md transition duration-300 hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleSearch}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="mt-8">
        <h1 className="text-center mb-2">Last Five Search Query </h1>
        <div className="flex gap-4 items-center justify-center">
          {lastSearchQuery.map((query, index) => (
            <button
              key={index}
              className="bg-white text-black px-4 py-2 rounded-md transition duration-300 hover:bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
            >
              {query.queryName}
            </button>
          ))}
        </div>
      </div>
      {loading && <p className="text-white text-center mt-4">Loading...</p>}
       {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {searchResults.map((result) => (
            <MovieCard key={result.imdbID} {...result} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchSection;
