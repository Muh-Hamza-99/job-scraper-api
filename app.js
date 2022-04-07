require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();

const morgan = require("morgan");

const scrapeData = require("./utilities/scrape-data");
const constructURL = require("./utilities/construct-url");

app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") app.use(express.json());

app.get("/", async (req, res) => {
    const url = constructURL(req.query); 
    const jobs = await scrapeData(url);t
    res.status(200).json({ status: "success", data: { jobs } });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));