const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Variant = require('../models/variant');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.create({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    // Delete associated variants
    await Variant.deleteMany({ product_id: req.params.id });
    res.json({ message: 'Product and associated variants deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve a product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('variants');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search products by name, description, or variant name
router.get('/search', async (req, res) => {
  try {
    const { searchTerm } = req.query;

    // Search products by name or description
    const productsByNameOrDescription = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { _id: 0 } 
      ],
    });

    // Search products by variant name without treating searchTerm as ObjectId
    const productsByVariantName = await Product.find(
      { 'variant.name': { $regex: searchTerm, $options: 'i' } },
      { _id: 0 }  // Exclude _id field from the result
    ).lean();

    const searchResults = [...new Set([...productsByNameOrDescription, ...productsByVariantName])];

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
