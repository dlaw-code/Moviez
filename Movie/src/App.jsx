import { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import SearchSection from "./SearchSection";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [lastSearchQuery, setlastSearchQuery] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLastSearchQueries = async () => {
    const apiUrl = `https://localhost:7003/api/Movie/latestSearchQueries`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setlastSearchQuery(data || []);
      console.log(lastSearchQuery);
    } catch (error) {
      console.error("Error fetching last search result:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);

    const apiUrl = `https://localhost:7003/api/Movie/searchResults?title=${searchQuery}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setSearchResults(data.search || []);
      fetchLastSearchQueries();
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastSearchQueries();
  }, []);

  return (
    <>
      <Router>
        <div
          className="text-white"
          style={{
            minHeight: "100vh",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/443881de-6e3c-4cbc-ac83-9e2a5affa6aa/NG-en-20240115-trifectadaily-perspective_alpha_website_large.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header>
            <nav className="w-11/12 md:w-10/12 mx-auto py-8">
              <div className="flex text-white justify-between gap-4 items-center">
                <Link to={"/"} className="cursor-pointer">
                  <h1 className="text-3xl font-bold">IMDB Movies</h1>
                </Link>
                <h4 className="text-sm">Home of amazing movies</h4>
              </div>
            </nav>
          </header>
          <Routes>
            <Route
              path="/"
              element={
                <SearchSection
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  searchResults={searchResults}
                  lastSearchQuery={lastSearchQuery}
                  loading={loading}
                  handleSearch={handleSearch}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
