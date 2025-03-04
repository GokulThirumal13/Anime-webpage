import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Animeselection.css";
import axios from "axios";

function F_bA() {
  const [animedata, setanimedata] = useState([]);
  const [filteredanime, setfilteredanime] = useState([]);
  const [search, setsearch] = useState("");
  const [genre, setgenre] = useState("");
  const [type, settype] = useState("");
  const [season, setseason] = useState("");
  const [year, setyear] = useState("");
  const [status, setstatus] = useState("");
  const navigate = useNavigate();
  const seasons = Array.from({ length: 7 }, (_, i) => `Season ${i + 1}`);
  const years = Array.from({ length: 24 }, (_, i) => 2024 - i);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const response = await axios.get("http://localhost:6969/anime");
        setanimedata(response.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    }
    fetchAnime();
  }, []);

  useEffect(() => {
    const filtered = animedata.filter((anime) => {
      return (
        (genre ? anime.genre === genre : true) &&
        (type ? anime.type === type : true) &&
        (season ? anime.season.includes(season) : true) &&
        (year ? anime.year.toString() === year : true) &&
        (status ? anime.status === status : true) &&
        (anime.name.toLowerCase().includes(search.toLowerCase()) || search === "")
      );
    });
    setfilteredanime(filtered);
  }, [genre, type, season, year, status, search, animedata]);

  function Loggingout() {
    localStorage.removeItem("isLoggedIn"); 
    navigate("/"); 
  }

  function Reset() {
    setsearch("");
    setgenre("");
    settype("");
    setseason("");
    setyear("");
    setstatus("");
  }

  return (
    <div>
      <button className="logout-btn" onClick={Loggingout}>Log out</button>
      
      <div className="filters">
        <h2 style={{ color: "yellow" }}>Search Your Favorite Anime</h2>
        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search Anime" />
  
        <select onChange={(e) => setgenre(e.target.value)} value={genre}>
          <option value="">Select Genre</option>
          {["Action", "Romance", "Comedy", "Adventure", "Thriller", "Horror", "Mecha", "Sci-fi", "Fantasy", "Drama"].map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>
  
        <select onChange={(e) => settype(e.target.value)} value={type}>
          <option value="">Select Type</option>
          {["TV", "Movie", "OVA"].map((t, i) => (
            <option key={i} value={t}>{t}</option>
          ))}
        </select>
  
        <select onChange={(e) => setseason(e.target.value)} value={season} disabled={type === "Movie"}>
          <option value="">Select Season</option>
          {seasons.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>
  
        <select onChange={(e) => setyear(e.target.value)} value={year}>
          <option value="">Select Year</option>
          {years.map((y, i) => (
            <option key={i} value={y}>{y}</option>
          ))}
        </select>
  
        <select onChange={(e) => setstatus(e.target.value)} value={status}>
          <option value="">Select Status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
  
        <button style={{ color: "white", width: "100px" }} onClick={Reset}>Reset Filters</button>
        <button className="news-btn" onClick={() => navigate("/news")}>news</button>

        
      </div>
  
      <div className="anime-list-container">
        {filteredanime.length > 0 ? (
          filteredanime.map((anime, index) => (
            <div key={index} className="anime-card">
              <img src={anime.image_url} alt={anime.name} />
              <h3>{anime.name}</h3>
              <p>{anime.genre} | {anime.year} | {anime.status}</p>
              <button className="details-button" onClick={() => navigate(`/anime/${anime.id}`)}>Details</button>
            </div>
          ))
        ) : (
          <p style={{color:'white'}}>No anime found. Try a different search!</p>
        )}
      </div>
    </div>
  );
  
}

export default F_bA;
