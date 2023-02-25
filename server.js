require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.use("/students", require("./routes/api/students"));

app.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("json")) res.json({ error: "404 Not Found" });
	else res.type("txt").send("404 Not Found");
});

mongoose.connection.once("open", () => {
	console.log("Database Connected");
	app.listen(PORT, () =>
		console.log(`Server is running on http://localhost:${PORT}`)
	);
});
