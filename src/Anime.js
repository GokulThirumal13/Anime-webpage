import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimeSelection from "./Animeselection";
import animejson from "./animeData";
import Navbar from "./Navbar";
import './Animeselection.css'


function Anime() {
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  


  const filteredAnime = animejson.filter((anime) =>
    anime.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
    
      <Navbar/>

     
      <div className="container mt-5">
        <input
          type="text"
          placeholder="Search Anime"
          className="form-control mb-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      <div className="container mt-5">
        {filteredAnime.length > 0 ? (
          filteredAnime.map((anime, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{anime.name}</h5>
                <p className="card-text">{anime.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No anime found. Try a different search!</p>
        )}
      </div>

      <AnimeSelection />
    </div>
  );
}

export default Anime;