// server.js
const express = require("express");
const mongoose = require("./db"); // Import your database connection
const categoryRoutes = require("./routes/categoryRoutes");
const subCategoryRoutes = require("./routes/subCategoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api", categoryRoutes);
app.use("/api", subCategoryRoutes);
app.use("/api", itemRoutes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
