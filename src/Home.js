import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import './Home.css'
function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeData, setAnimeData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  
  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await axios.get("http://localhost:6969/anime"); 
        setAnimeData(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching anime data:", error);
        setError("Failed to fetch anime data. Please try again later."); 
        setLoading(false);
      }
    }

    fetchAnime();
  }, []);

  
  const filteredAnime = animeData.filter((anime) =>
    anime.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewAllAnime = () => {
    if (isLoggedIn) {
      navigate('/anime'); 
    }
    else{
      navigate('/login'); 
    }
  };

  
  return (
    <div className="container mt-5">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/login" className="nav-link" style={{ color: 'white' }}>Login</Link>
          <Link to="/signup" className="nav-link" style={{ color: 'white' }}>Sign Up</Link>
        </div>
      </nav>

      <h1 className="text-center" style={{ color: 'white' }}>Welcome to Anime Finder</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search Anime by Name"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="text-center mt-4">
        <button onClick={handleViewAllAnime} className="btn btn-primary">
          Weeblist
        </button>
      </div>

      {searchQuery && (
        <div className="anime-grid-container">
          {filteredAnime.length > 0 ? (
            filteredAnime.map((anime, index) => (
              <div key={index} className="anime-box">
                <img src={anime.image_url} alt={anime.name} className="anime-image" />
                <div className="anime-details">
                  <h3>{anime.name}</h3>
                  <p><strong>Genre:</strong> {anime.genre}</p>
                  <p><strong>Type:</strong> {anime.type}</p>
                  <p><strong>Year:</strong> {anime.year}</p>
                  <p><strong>Status:</strong> {anime.status}</p>
                  <p><strong>Description:</strong> {anime.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-3">No anime found. Try a different search!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;