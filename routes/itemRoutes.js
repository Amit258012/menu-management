const express = require("express");
const router = express.Router();
const {
	createItem,
	getAllItems,
	getItem,
	searchItem,
	getItemsByCategory,
	getItemsBySubcategory,
	updateItem,
	deleteItem,
} = require("../controllers/itemController");

// create item
router.post("/items", createItem);

// Get all items
router.get("/items", getAllItems);

// Route to get items by category ID
router.get("/categories/:categoryId/items", getItemsByCategory);

// Route to get items by subcategory ID
router.get("/subcategory/:subcategoryId/items", getItemsBySubcategory);

// Get an item by ID or Name
router.get("/items/:idOrName", getItem);

// search item by name
router.get("/search", searchItem);

// Update an item by ID
router.put("/items/:id", updateItem);

// Route to delete an item by ID
router.delete("/items/:id", deleteItem);

module.exports = router;
