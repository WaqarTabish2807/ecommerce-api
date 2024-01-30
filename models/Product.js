const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
