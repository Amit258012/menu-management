const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Category Schema
 * @typedef {Object} CategorySchema
 * @property {string} name - The name of the category. Required.
 * @property {string} image - The image URL of the category. Required.
 * @property {string} description - The description of the category. Required.
 * @property {boolean} taxApplicability - Indicates if tax is applicable for this category. Default is false.
 * @property {number} tax - The tax percentage for this category. Required if taxApplicability is true.
 * @property {string} taxType - The type of tax. Default is "percentage".
 * @property {Array<string>} subCategories - The sub-categories associated with this category.
 * @property {Array<string>} items - The items associated with this category.
 */
const CategorySchema = new Schema({
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
		required: function () {
			return this.taxApplicability;
		},
	},
	taxType: {
		type: String,
		default: "percentage",
	},
	subCategories: [
		{
			type: Schema.Types.ObjectId,
			ref: "SubCategory",
		},
	],
	items: [
		{
			type: Schema.Types.ObjectId,
			ref: "Item",
		},
	],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
