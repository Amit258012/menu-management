const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * SubCategorySchema represents the schema for a subcategory in the menu management system.
 *
 * @typedef {Object} SubCategorySchema
 * @property {string} name - The name of the subcategory. Required.
 * @property {string} image - The image URL of the subcategory. Required.
 * @property {string} description - The description of the subcategory. Required.
 * @property {boolean} taxApplicability - Indicates if tax is applicable to the subcategory. Default is false.
 * @property {number} tax - The tax rate for the subcategory. Default is 0.
 * @property {string} taxType - The type of tax for the subcategory. Can be "percentage" or "fixed". Default is "percentage".
 * @property {Array.<Schema.Types.ObjectId>} items - The list of item IDs associated with the subcategory.
 * @property {Schema.Types.ObjectId} category - The category ID to which the subcategory belongs. Required.
 */
const SubCategorySchema = new Schema({
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
	taxType: {
		type: String,
		default: "percentage",
	},
	items: [
		{
			type: Schema.Types.ObjectId,
			ref: "Item",
		},
	],
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
});

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

module.exports = SubCategory;
