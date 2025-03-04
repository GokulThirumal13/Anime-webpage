import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Animeselection.css";
import animejson from "./animeData";

function AnimeSelection() {
    const [animedata, setanimedata] = useState([]);
    const [filteredanime, setfilteredanime] = useState([]);
    const [search, setsearch] = useState("");
    const [genre, setgenre] = useState("");
    const [type, settype] = useState("");
    const [season, setseason] = useState("");
    const [year, setyear] = useState("");
    const [status, setstatus] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      setanimedata(animejson);
    }, []);
  
    useEffect(() => {
      const filtered = animedata.filter((anime) => {
        return (
          (genre ? anime.genre === genre : true) &&
          (type ? anime.type === type : true) &&
          (season ? anime.season.includes(season) : true) &&
          (year ? anime.year === year : true) &&
          (status ? anime.status === status : true) &&
          (anime.name.toLowerCase().includes(search.toLowerCase()) || search === "")
        );
      });
      setfilteredanime(filtered);
    }, [genre, type, season, year, status, search, animedata]);
  
    const uniqueSeasons = [...new Set(animedata.flatMap((anime) => anime.season))];
    const uniqueYears = [...new Set(animedata.map((anime) => anime.year))];
  
    function Searchchange(e) {
      setsearch(e.target.value);
    }
    function Genrechange(e) {
      setgenre(e.target.value);
    }
    function Typechange(e) {
      const m=e.target.value
      settype(m);

      if (m==='Movie'){
        setseason('');
      }
    }
    function Seasonchange(e) {
      setseason(e.target.value);
    }
    function Yearchange(e) {
      setyear(e.target.value);
    }
    function Statuschange(e) {
      setstatus(e.target.value);
    }
    function Reset() {
      setsearch("");
      setgenre("");
      settype("");
      setseason("");
      setyear("");
      setstatus("");
    }
    function logout(){
      console.log("Logging out...");
  navigate('/Home');
    }
  
    return (
      <div className="anime-container">
        <div className="filters">
          <h2>Search Your Favorite Anime</h2>
          <input type="text" value={search} onChange={Searchchange} placeholder="Search Anime" />
          <select onChange={Genrechange} value={genre}>
            <option value="">Select Genre</option>
            {["Action", "Romance", "Comedy", "Adventure", "Thriller", "Horror", "Mecha", "Sci-fi", "Fantasy", "Drama"].map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
          <select onChange={Typechange} value={type}>
            <option value="">Select Type</option>
            {["TV", "Movie", "OVA"].map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
          <select onChange={Seasonchange} value={season} disabled={type==='Movie'}>
            <option value="">Select Season</option>
            {uniqueSeasons.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
          <select onChange={Yearchange} value={year}>
            <option value="">Select Year</option>
            {uniqueYears.map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))}
          </select>
          <select onChange={Statuschange} value={status}>
            <option value="">Select Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={Reset}>Reset Filters</button>
          
        <button style={{ color: 'green', width: '100px' }} onClick={logout}>
  Log out
</button>
        </div>
  
        <div className="anime-list-container">
          {filteredanime.length > 0 ? (
            filteredanime.map((anime, index) => (
              <div key={index} className="anime-card">
                <img src={anime.image_url} alt={anime.name} />
                <h3>{anime.name}</h3>
                <p>{anime.genre} | {anime.year} | {anime.status}</p>
                <button onClick={() => navigate(`/anime/${index}`)}>Details</button>
              </div>
            ))
          ) : (
            <p className="no-anime-message">No anime found. Try a different search!</p>
          )}
        </div>

      </div>
    );
  }
  
  export default AnimeSelection;
