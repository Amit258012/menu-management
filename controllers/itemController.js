const mongoose = require("mongoose");
const Item = require("../models/Item");
const Category = require("../models/Category");
const Subcategory = require("../models/SubCategory");

/**
 * The function `createItem` creates a new item with specified details and associates it with a
 * category and subcategory in a database.
 * @param req - The `req` parameter in the `createItem` function represents the request object, which
 * contains information about the HTTP request that triggered the function. This object includes
 * properties such as `req.body` (containing the data sent in the request body), `req.params`
 * (containing route parameters),
 * @param res - The `res` parameter in the `createItem` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data back to the client. In this function, it is used to send JSON
 * @returns If the category or subcategory is not found, an error message will be returned with status
 * code 404. If there are any other errors during the process, an error message will be returned with
 * status code 500. If the item is successfully created and saved, the saved item will be returned with
 * status code 201.
 */
const createItem = async (req, res) => {
	try {
		const {
			name,
			image,
			description,
			taxApplicability,
			tax,
			baseAmount,
			discount,
			totalAmount,
			category,
			subcategory,
		} = req.body;

		const parentCategory = await Category.findById(category);
		if (!parentCategory) {
			return res.status(404).json({ error: "Category not found" });
		}

		const parentSubcategory = await Subcategory.findById(subcategory);
		if (!parentSubcategory) {
			return res.status(404).json({ error: "Subcategory not found" });
		}

		const newItem = new Item({
			name,
			image,
			description,
			taxApplicability,
			tax,
			baseAmount,
			discount,
			totalAmount,
			category,
			subcategory,
		});

		const savedItem = await newItem.save();

		parentCategory.items.push(savedItem._id);
		parentSubcategory.items.push(savedItem._id);

		await parentCategory.save();
		await parentSubcategory.save();

		res.status(201).json(savedItem);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getAllItems` retrieves all items from the database and sends them as a JSON response,
 * handling any errors that occur.
 * @param req - The `req` parameter in the `getAllItems` function typically represents the HTTP request
 * object, which contains information about the incoming request such as the request method, headers,
 * parameters, and body. It is commonly used to access data sent from the client to the server.
 * @param res - The `res` parameter in the `getAllItems` function is the response object that is used
 * to send a response back to the client making the request. It allows you to set the status code, send
 * data, and handle errors in the response.
 */
const getAllItems = async (req, res) => {
	try {
		const items = await Item.find();
		// .populate("category")
		// .populate("subcategory");
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getItem` retrieves an item by ID or name from the database and returns it as JSON,
 * handling errors appropriately.
 * @param req - The `req` parameter in the `getItem` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as the parameters,
 * body, headers, and other details sent by the client to the server. In this case,
 * `req.params.idOrName`
 * @param res - The `res` parameter in the `getItem` function is the response object that will be used
 * to send the response back to the client making the request. It is typically used to set the status
 * code and send data back in the response.
 * @returns The `getItem` function is returning either the item found by id or name from the database
 * if it exists, or a 404 error response with the message "Item not found" if the item does not exist.
 * If an error occurs during the process, it will return a 500 error response with the error message.
 */
const getItem = async (req, res) => {
	try {
		const idOrName = req.params.idOrName;
		let item;
		if (mongoose.Types.ObjectId.isValid(idOrName)) {
			item = await Item.findById(idOrName);
			// .populate("category")
			// .populate("subcategory");
		} else {
			item = await Item.findOne({ name: idOrName });
			// .populate("category")
			// .populate("subcategory");
		}
		if (!item) {
			return res.status(404).json({ error: "Item not found" });
		}
		res.status(200).json(item);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `searchItem` searches for an item by name and returns it if found, otherwise it returns
 * an error message.
 * @param req - The `req` parameter in the `searchItem` function is typically an object representing
 * the HTTP request. It contains information about the request made by the client, such as the request
 * headers, parameters, body, and more. In this case, `req.query.name` is accessing the query parameter
 * named
 * @param res - The `res` parameter in the `searchItem` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to send HTTP responses
 * with status codes and data in various formats like JSON.
 * @returns If the item is not found, the function will return a 404 status with a JSON object
 * containing the error message "Item not found". If an error occurs during the search process, the
 * function will return a 500 status with a JSON object containing the error message generated by the
 * error. If the item is found successfully, the function will return a 200 status with a JSON object
 * containing the item
 */
const searchItem = async (req, res) => {
	const item = req.query.name;
	console.log(item);
	try {
		const items = await Item.findOne({ name: item });
		if (!items) {
			return res.status(404).json({ error: "Item not found" });
		}
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getItemsByCategory` retrieves items based on a specified category ID and sends the
 * results as a JSON response.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as the parameters, body, headers, and more.
 * In this case, `req.params.categoryId` is used to extract the category ID from the request
 * parameters.
 * @param res - The `res` parameter in the `getItemsByCategory` function is the response object that
 * will be used to send a response back to the client making the request. It is typically used to set
 * the status code and send data back in the response.
 */
const getItemsByCategory = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const items = await Item.find({ category: categoryId });
		// .populate("category")
		// .populate("subcategory");
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `getItemsBySubcategory` retrieves items based on a specified subcategory ID and sends
 * them as a JSON response.
 * @param req - The `req` parameter in the `getItemsBySubcategory` function stands for the request
 * object. It contains information about the HTTP request that triggered the function, such as request
 * headers, parameters, body, and more. In this case, `req.params.subcategoryId` is used to extract the
 * @param res - The `res` parameter in the `getItemsBySubcategory` function is the response object that
 * will be used to send a response back to the client making the request. It is typically used to set
 * the status code and send data back in the response.
 */
const getItemsBySubcategory = async (req, res) => {
	try {
		const subcategoryId = req.params.subcategoryId;
		const items = await Item.find({ subcategory: subcategoryId });
		// .populate("category")
		// .populate("subcategory");
		res.status(200).json(items);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `updateItem` updates an item in a database based on the provided request parameters and
 * body data.
 * @param req - The `req` parameter in the `updateItem` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, including details like
 * request headers, parameters, body, and more. In this specific function, `req` is used to extract the
 * item ID from the
 * @param res - The `res` parameter in the `updateItem` function is the response object that will be
 * used to send a response back to the client making the request. It is typically used to send HTTP
 * responses with status codes and data in JSON format. In the provided code snippet, `res` is used
 * @returns The `updateItem` function is updating an item in a database based on the request parameters
 * and body data. If the update is successful, it returns the updated item in JSON format with a status
 * code of 200. If the item to be updated is not found, it returns a JSON object with an error message
 * stating "Item not found" and a status code of 404. If there is
 */
const updateItem = async (req, res) => {
	try {
		const itemId = req.params.id;
		const {
			name,
			image,
			description,
			taxApplicability,
			tax,
			baseAmount,
			discount,
			totalAmount,
			category,
			subcategory,
		} = req.body;

		const updatedItem = await Item.findByIdAndUpdate(
			itemId,
			{
				name,
				image,
				description,
				taxApplicability,
				tax,
				baseAmount,
				discount,
				totalAmount,
				category,
				subcategory,
			},
			{ new: true }
		);
		// .populate("category")
		// .populate("subcategory");

		if (!updatedItem) {
			return res.status(404).json({ error: "Item not found" });
		}

		res.status(200).json(updatedItem);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

/**
 * The function `deleteItem` deletes an item by its ID and returns a success message or an error
 * message if the item is not found or an error occurs.
 * @param req - The `req` parameter in the `deleteItem` function stands for the request object. It
 * contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, `req.params.id` is used to extract the `id` parameter
 * @param res - The `res` parameter in the `deleteItem` function is the response object that is used to
 * send a response back to the client making the request. It is typically used to set the status code
 * of the response and send data back to the client in the form of JSON or other formats. In
 * @returns If the item is successfully deleted, a JSON response with a status of 200 and a message
 * "Item deleted successfully" is being returned. If the item is not found (i.e., not deleted), a JSON
 * response with a status of 404 and an error message "Item not found" is being returned. If an error
 * occurs during the deletion process, a JSON response with a status of
 */
const deleteItem = async (req, res) => {
	try {
		const itemId = req.params.id;
		const deletedItem = await Item.findByIdAndDelete(itemId);

		if (!deletedItem) {
			return res.status(404).json({ error: "Item not found" });
		}

		res.status(200).json({ message: "Item deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	createItem,
	getAllItems,
	getItem,
	searchItem,
	getItemsByCategory,
	getItemsBySubcategory,
	updateItem,
	deleteItem,
};
