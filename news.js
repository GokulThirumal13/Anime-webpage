const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 7001;

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
const newsCollection = db.collection("news");

app.get("/news", async (req, res) => {
    try {
        const news = await newsCollection.find().toArray();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch anime news", error: error.message });
    }
});

app.post("/news",async (req, res) => {
    try {
        const {title,description,release_date,image_url,source_link} = req.body;

        if (!title||!description||!release_date||!image_url||!source_link) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newNews = {title,description,release_date,image_url,source_link };
        await newsCollection.insertOne(newNews);

        res.status(201).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add news", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
