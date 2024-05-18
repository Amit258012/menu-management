const express = require("express");
const router = express.Router();
const {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/categoryController");

// Create a new category
router.post(`/categories`, createCategory);

// Get all categories
router.get(`/categories`, getCategories);

// Get category by ID or Name
router.get(`/categories/:idOrName`, getCategory);

// Update category by ID
router.put(`/categories/:id`, updateCategory);

// Delete category by ID
router.delete(`/categories/:id`, deleteCategory);

module.exports = router;
