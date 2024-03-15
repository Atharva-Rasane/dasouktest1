const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  sid: { type: String, required: true },
  name: String,
  description: String,
  category_id: String,
  brand_id: String,
  price: Number,
  currency: String,
  stock_level: Number,
  image_url: String,
  additional_images: { type: [String] }, // Array of strings for additional image URLs
});

const products = mongoose.model("products", productSchema);

module.exports = products;
