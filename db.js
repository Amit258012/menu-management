// db.js
const mongoose = require("mongoose");

// Connect to MongoDB

// "mongodb+srv://amit258012:D9TiPFjAmBJ0URSc@cluster0.5pezg5g.mongodb.net/",
mongoose
	.connect("mongodb://0.0.0.0:27017/menu-management")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = mongoose;
