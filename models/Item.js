const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Represents the schema for an item in the menu.
 *
 * @typedef {Object} ItemSchema
 * @property {string} name - The name of the item.
 * @property {string} image - The image URL of the item.
 * @property {string} description - The description of the item.
 * @property {boolean} taxApplicability - Indicates if tax is applicable to the item.
 * @property {number} tax - The tax amount for the item.
 * @property {number} baseAmount - The base amount of the item.
 * @property {number} discount - The discount amount for the item.
 * @property {number} totalAmount - The total amount of the item.
 * @property {Schema.Types.ObjectId} category - The category ID of the item.
 * @property {Schema.Types.ObjectId} subcategory - The subcategory ID of the item.
 */
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	taxApplicability: {
		type: Boolean,
		default: false,
	},
	tax: {
		type: Number,
		default: 0,
	},
	baseAmount: {
		type: Number,
		required: true,
	},
	discount: {
		type: Number,
		default: 0,
	},
	totalAmount: {
		type: Number,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	subcategory: {
		type: Schema.Types.ObjectId,
		ref: "SubCategory",
		required: true,
	},
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
