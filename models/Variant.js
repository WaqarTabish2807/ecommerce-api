const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  sku: String,
  additional_cost: Number,
  stock_count: Number,
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = Variant;
