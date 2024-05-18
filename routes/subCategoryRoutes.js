const express = require("express");
const router = express.Router();
const {
	createSubcategory,
	getAllSubcategories,
	getSubcategory,
	updateSubcategory,
	getSubcategoriesByCategory,
	deleteSubcategory,
} = require("../controllers/subCategoryController");

// create new subcategory
router.post("/subcategories", createSubcategory);

// Get all subcategories
router.get("/subcategories", getAllSubcategories);

// Route to get subcategories by category ID
router.get("/categories/:categoryId/subcategories", getSubcategoriesByCategory);

// Get a subcategory by ID or Name
router.get("/subcategories/:idOrName", getSubcategory);

// Update a subcategory by ID
router.put("/subcategories/:id", updateSubcategory);

// Delete a subcategory by ID
router.delete("/subcategories/:id", deleteSubcategory);

module.exports = router;
