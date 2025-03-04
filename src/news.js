import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './news.css'

function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch("http://localhost:7001/news");
                if (!response.ok) {
                    throw new Error("Failed to fetch news");
                }
                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="news-container">
            <h2>Anime News</h2>
            <ul className="news-list">
                {news.map((item) => (
                    <li key={item._id} className="news-item">
                        <h3 className="news-title">{item.title}</h3>
                        <p style={{color:"black"}}className="news-description">{item.description}</p>
                        <p style={{color:"black"}}className="news-date">Release Date: {item.release_date}</p>
                        <img src={item.image_url} alt={item.title} className="news-image" />
                        <p>
                            <a href={item.source_link} target="_blank" rel="noopener noreferrer" className="news-source">
                                Source
                            </a>
                        </p>
                    </li>
                ))}
                 
            </ul>
            <Link to="/anime" className="btn btn-secondary mt-3" style={{ padding: '5px 10px', display: 'inline-block' }}>
    Back to Anime
</Link>

        </div>
    );
    
};

export default News;
