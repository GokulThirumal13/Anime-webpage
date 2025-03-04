const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 6969;


app.use(express.json());
app.use(cors());


const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

connectDB();

const db = client.db("crud");
const animeCollection = db.collection("users");


app.get("/anime", async (req, res) => {
    try {
        const animeList = await animeCollection.find({}).toArray();
        res.json(animeList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching anime list", error: error.message });
    }
});

app.get("/anime/:id", async (req, res) => {
    try {
        const animeId = parseInt(req.params.id);
        if (isNaN(animeId)) {
            return res.status(400).json({ message: "Invalid anime ID" });
        }
        const anime = await animeCollection.findOne({ id: animeId });
        if (!anime) {
            return res.status(404).json({ message: "Anime not found" });
        }

        res.json(anime);
    } catch (error) {
        res.status(500).json({ message: "Error fetching anime details", error: error.message });
    }
});

app.post("/anime", async (req, res) => {
    try {
        if (!Array.isArray(req.body)||req.body.length===0) {
            return res.status(400).json({ message: "Request body must be a nonempty array" });
        }
        const lastAnime=await animeCollection.find().sort({ id: -1 }).limit(1).toArray();
        let lastId=0;
        if (lastAnime.length > 0) {
            lastId=lastAnime[0].id;
        }

        const newAnimeList=req.body.map((anime, index) => {
            if (
                !anime.name||!anime.genre||!anime.type||!anime.season||!anime.year||!anime.status||!anime.image_url||!anime.description
            ) {
                throw new Error(`All fields are required for anime at index ${index}`);
            }

            if (typeof anime.year !== "number") {
                throw new Error(`Year must be a number for anime at index ${index}`);
            }

            return {
                id: lastId + index + 1, 
                name: anime.name,
                genre: anime.genre,
                type: anime.type,
                season: anime.season,
                year: anime.year,
                status: anime.status,
                image_url: anime.image_url,
                description: anime.description,
            };
        });

        await animeCollection.insertMany(newAnimeList);
        res.status(201).json({ message: "Anime added successfully", anime: newAnimeList });
    } catch (error) {
        res.status(500).json({ message: "Error adding anime", error: error.message });
    }
});

app.put("/anime/:id", async (req, res) => {
    try {
        const animeId = parseInt(req.params.id);
        if (isNaN(animeId)) {
            return res.status(400).json({ message: "Invalid anime ID" });
        }

        const { name, genre, type, season, year, status, image_url, description } = req.body;
        const updateFields = {};
        if (name) {
            updateFields.name = name;
        }
        if (genre) {
            updateFields.genre = genre;
        }
        if (type){updateFields.type = type;
        }
        if (season) {
            if (!Array.isArray(season)) {
                return res.status(400).json({ message: "Season must be an array" });
            }
            updateFields.season = season;
        }
        if (year) {
            if (typeof year !== "number") {
                return res.status(400).json({ message: "Year must be a number" });
            }
            updateFields.year = year;
        }
        if (status) 
            {
                updateFields.status = status;
            }
        if (image_url) 
            {updateFields.image_url = image_url;
            }
        if (description) 
            {
            updateFields.description = description;
            }

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "At least one field must be updated" });
        }
        const result = await animeCollection.updateOne(
            { id: animeId },
            { $set: updateFields }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Anime not found" });
        }

        res.json({ message: "Anime updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating anime", error: error.message });
    }
});


app.delete("/anime/:id", async (req, res) => {
    try {
        const animeId = parseInt(req.params.id);
        if (isNaN(animeId)) {
            return res.status(400).json({ message: "Invalid anime ID" });
        }

        const result = await animeCollection.deleteOne({ id: animeId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Anime not found" });
        }

        res.json({ message: "Anime deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting anime", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});