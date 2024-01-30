const express = require('express');
const router = express.Router();
const Variant = require('../models/variant');
const Product = require('../models/product');

// Create a new variant
router.post('/', async (req, res) => {
  try {
    const { name, sku, additional_cost, stock_count, product_id } = req.body;
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const variant = await Variant.create({ name, sku, additional_cost, stock_count, product_id });
    product.variants.push(variant._id);
    await product.save();

    res.status(201).json(variant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a variant
router.put('/:id', async (req, res) => {
  try {
    const { name, sku, additional_cost, stock_count, product_id } = req.body;
    const variant = await Variant.findByIdAndUpdate(req.params.id, { name, sku, additional_cost, stock_count, product_id }, { new: true });
    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }
    res.json(variant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a variant
router.delete('/:id', async (req, res) => {
  try {
    const variant = await Variant.findByIdAndDelete(req.params.id);
    if (!variant) {
      return res.status(404).json({ error: 'Variant not found' });
    }

    // Remove variant reference from associated product
    const product = await Product.findById(variant.product_id);
    product.variants = product.variants.filter(v => v.toString() !== variant._id.toString());
    await product.save();

    res.json({ message: 'Variant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
