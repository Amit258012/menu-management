const mongoose = require("mongoose");
const Category = require("../models/Category");

/**
 * The function `createCategory` creates a new category with specified details and saves it to the
 * database.
 * @param req - The `req` parameter in the `createCategory` function is typically the request object
 * that contains information sent by the client to the server. It includes data such as the category
 * name, image, description, tax applicability, and tax that are needed to create a new category.
 * @param res - The `res` parameter in the `createCategory` function is the response object that will
 * be sent back to the client making the request. It is used to send a response back to the client with
 * the status and data. In this case, the function is sending a JSON response with the saved category
 */
const createCategory = async (req, res) => {
	try {
		const { name, image, description, taxApplicability, tax } = req.body;
		const newCategory = new Category({
			name,
			image,
			description,
			taxApplicability,
			tax,
		});
		const savedCategory = await newCategory.save();
		res.status(201).json(savedCategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getCategories` retrieves all categories along with their subcategories and items from
 * the database and sends them as a JSON response.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as the URL, headers, parameters, and body
 * data. In this context, `req` is used to handle incoming requests to get all categories.
 * @param res - The `res` parameter in the `getCategories` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data in JSON format.
 */
const getCategories = async (req, res) => {
	try {
		const categories = await Category.find();
		// .populate("subCategories")
		// .populate("items");
		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getCategory` retrieves a single category by ID or Name from a database using
 * asynchronous operations in JavaScript.
 * @param req - The `req` parameter in the `getCategory` function is an object representing the HTTP
 * request. It contains information about the request made by the client, such as the request
 * parameters, headers, body, and other details. In this case, `req.params.idOrName` is used to extract
 * @param res - The `res` parameter in the `getCategory` function is the response object that will be
 * used to send the response back to the client making the request. It is typically used to set the
 * status code and send data back in the response.
 * @returns If the category is found successfully, the function will return a status of 200 along with
 * the category object in JSON format. If the category is not found, it will return a status of 404
 * with an error message stating "Category not found". If an error occurs during the process, it will
 * return a status of 500 with an error message.
 */
const getCategory = async (req, res) => {
	try {
		const idOrName = req.params.idOrName;
		let category;
		if (mongoose.Types.ObjectId.isValid(idOrName)) {
			category = await Category.findById(idOrName);
		} else {
			// If not an ObjectId, assume it's a name
			category = await Category.findOne({ name: idOrName });
		}
		if (!category) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.status(200).json(category);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `updateCategory` updates a category in a database based on the provided ID.
 * @param req - The `req` parameter in the `updateCategory` function is the request object that
 * contains information about the HTTP request made to the server. It includes data such as request
 * headers, parameters, body, query parameters, and more. In this case, `req.body` is used to extract
 * the data
 * @param res - The `res` parameter in the `updateCategory` function is the response object that will
 * be used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data back to the client. In this function, `res` is used to
 * @returns If the category is successfully updated, the updated category object is returned with a
 * status code of 200. If the category is not found, a JSON response with an error message "Category
 * not found" and a status code of 404 is returned. If there is an error during the update process, a
 * JSON response with the error message is returned with a status code of 500.
 */
const updateCategory = async (req, res) => {
	try {
		const { name, image, description, taxApplicability, tax } = req.body;
		const updatedCategory = await Category.findByIdAndUpdate(
			req.params.id,
			{
				name,
				image,
				description,
				taxApplicability,
				tax,
			},
			{ new: true }
		);
		if (!updatedCategory) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.status(200).json(updatedCategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `deleteCategory` deletes a category by its ID and returns a success message if the
 * deletion is successful.
 * @param req - The `req` parameter in the `deleteCategory` function stands for the request object,
 * which contains information about the HTTP request that triggered the function. This object includes
 * details such as the request parameters, body, headers, and more. In this case, `req.params.id` is
 * used to access
 * @param res - The `res` parameter in the `deleteCategory` function is the response object that is
 * used to send a response back to the client making the request. It is typically used to set the
 * status code of the response and send data back to the client in the form of JSON or other formats.
 * In
 * @returns If the category is successfully deleted, a JSON response with a message "Category deleted
 * successfully" and a status code of 200 is being returned. If the category is not found, a JSON
 * response with an error message "Category not found" and a status code of 404 is being returned. If
 * an error occurs during the deletion process, a JSON response with the error message is being
 * returned with a status code of 500.
 */
const deleteCategory = async (req, res) => {
	try {
		const deletedCategory = await Category.findByIdAndDelete(req.params.id);
		if (!deletedCategory) {
			return res.status(404).json({ error: "Category not found" });
		}
		res.status(200).json({ message: "Category deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createCategory,
	getCategories,
	getCategory,
	updateCategory,
	deleteCategory,
};
