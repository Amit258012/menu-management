const mongoose = require("mongoose");
const Subcategory = require("../models/SubCategory");
const Category = require("../models/Category");

/**
 * The function `createSubcategory` creates a new subcategory, associates it with a parent category,
 * and saves it to the database.
 * @param req - The `req` parameter in the `createSubcategory` function represents the request object.
 * It contains information about the HTTP request that triggered the function, including the request
 * body (`req.body`) which typically contains data sent by the client to the server. In this case, the
 * function is expecting data such
 * @param res - The `res` parameter in the `createSubcategory` function is the response object that
 * will be used to send the response back to the client making the request. It allows you to send HTTP
 * responses with status codes, headers, and data back to the client. In this function, it is used
 * @returns If the category is not found, the function will return a 404 status with a JSON object
 * containing an error message "Category not found". If there is an error during the process, the
 * function will return a 500 status with a JSON object containing the error message. Otherwise, if the
 * subcategory is successfully created and saved, it will return a 201 status with the saved
 * subcategory object in
 */
const createSubcategory = async (req, res) => {
	try {
		const {
			name,
			image,
			description,
			taxApplicability,
			tax,
			category,
			items,
		} = req.body;

		const parentCategory = await Category.findById(category);
		if (!parentCategory) {
			return res.status(404).json({ error: "Category not found" });
		}

		const newSubcategory = new Subcategory({
			name,
			image,
			description,
			taxApplicability,
			tax,
			category,
			items,
		});

		const savedSubcategory = await newSubcategory.save();

		parentCategory.subCategories.push(savedSubcategory._id);
		await parentCategory.save();

		res.status(201).json(savedSubcategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function getAllSubcategories retrieves all subcategories from the database and sends them as a
 * JSON response.
 * @param req - The `req` parameter in the `getAllSubcategories` function typically represents the HTTP
 * request object, which contains information about the incoming request from the client, such as
 * headers, parameters, body, etc. It is commonly used to access data sent by the client to the server.
 * @param res - The `res` parameter in the `getAllSubcategories` function is the response object that
 * will be used to send a response back to the client making the request. It is typically used to send
 * HTTP responses with status codes and data in various formats like JSON.
 */
const getAllSubcategories = async (req, res) => {
	try {
		const subcategories = await Subcategory.find();
		// .populate("category")
		// .populate("items");
		res.status(200).json(subcategories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getSubcategoriesByCategory` retrieves subcategories based on a specified category ID
 * and sends them as a JSON response.
 * @param req - The `req` parameter in the `getSubcategoriesByCategory` function stands for the request
 * object. It contains information about the HTTP request that triggered the function, such as request
 * headers, parameters, body, and more. In this case, `req.params.categoryId` is used to extract the
 * @param res - The `res` parameter in the `getSubcategoriesByCategory` function is the response object
 * that will be used to send a response back to the client making the request. It is typically used to
 * send HTTP responses with data or error messages.
 */
const getSubcategoriesByCategory = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const subcategories = await Subcategory.find({ category: categoryId });
		// .populate("category")
		// .populate("items");
		res.status(200).json(subcategories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getSubcategory` retrieves a subcategory either by ID or name and returns it as a JSON
 * response, handling errors appropriately.
 * @param req - The `req` parameter in the `getSubcategory` function is an object representing the HTTP
 * request. It contains information about the request made to the server, such as the request
 * parameters, headers, body, and more. In this case, `req.params.idOrName` is used to extract
 * @param res - The `res` parameter in the `getSubcategory` function is the response object that will
 * be used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data in JSON format.
 * @returns The `getSubcategory` function is returning a subcategory object in JSON format if it is
 * found based on the provided `idOrName` parameter. If the subcategory is not found, it returns a 404
 * status with an error message "Subcategory not found". If an error occurs during the process, it
 * returns a 500 status with an error message.
 */
const getSubcategory = async (req, res) => {
	try {
		const idOrName = req.params.idOrName;
		let subcategory;
		if (mongoose.Types.ObjectId.isValid(idOrName)) {
			subcategory = await Subcategory.findById(idOrName);
			// .populate("category")
			// .populate("items");
		} else {
			subcategory = await Subcategory.findOne({ name: idOrName });
			// .populate("category")
			// .populate("items");
		}
		if (!subcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.status(200).json(subcategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `updateSubcategory` updates a subcategory in a database based on the provided request
 * data.
 * @param req - The `req` parameter in the `updateSubcategory` function stands for the request object.
 * It contains information about the HTTP request that triggered the function, including details like
 * request headers, parameters, body, and more. In this specific function, `req` is used to extract
 * data such as the
 * @param res - The `res` parameter in the `updateSubcategory` function is the response object that
 * will be used to send responses back to the client making the request. It is typically used to send
 * HTTP responses with status codes and data in JSON format.
 * @returns The `updateSubcategory` function is updating a subcategory based on the provided request
 * parameters and body data. If the update is successful, it returns the updated subcategory object
 * with a status code of 200. If the subcategory to update is not found, it returns a 404 status with
 * an error message "Subcategory not found". If an error occurs during the update process, it returns
 */
const updateSubcategory = async (req, res) => {
	try {
		const subcategoryId = req.params.id;
		const {
			name,
			image,
			description,
			taxApplicability,
			tax,
			category,
			items,
		} = req.body;

		const updatedSubcategory = await Subcategory.findByIdAndUpdate(
			subcategoryId,
			{
				name,
				image,
				description,
				taxApplicability,
				tax,
				category,
				items,
			},
			{ new: true }
		);

		if (!updatedSubcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}

		res.status(200).json(updatedSubcategory);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `deleteSubcategory` deletes a subcategory by its ID and returns a success message if
 * the deletion is successful.
 * @param req - The `req` parameter in the `deleteSubcategory` function stands for the request object.
 * It contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and other details. In this case, `req.params.id` is used to extract the `id
 * @param res - The `res` parameter in the `deleteSubcategory` function is the response object that is
 * used to send a response back to the client making the request. It is typically used to send status
 * codes, JSON data, or other responses to the client. In the provided code snippet, `res`
 * @returns If the subcategory is successfully deleted, a JSON response with a status of 200 and a
 * message "Subcategory deleted successfully" is being returned. If the subcategory is not found, a
 * JSON response with a status of 404 and an error message "Subcategory not found" is being returned.
 * If an error occurs during the deletion process, a JSON response with a status of 500 and
 */
const deleteSubcategory = async (req, res) => {
	try {
		const subcategoryId = req.params.id;
		const deletedSubcategory = await Subcategory.findByIdAndDelete(
			subcategoryId
		);

		if (!deletedSubcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}
		res.status(200).json({ message: "Subcategory deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createSubcategory,
	getAllSubcategories,
	getSubcategoriesByCategory,
	getSubcategory,
	updateSubcategory,
	deleteSubcategory,
};
