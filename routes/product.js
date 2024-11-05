const express = require('express');
const Product = require('../models/product.model'); // Đảm bảo đường dẫn đúng tới file model
const cloudinary = require('../config/cloudinary'); // Đảm bảo đường dẫn đúng
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: 'products',
            allowed_formats: ['jpg', 'png', 'jpeg'],
            public_id: uuidv4(),
        };
    },
});

const upload = multer({ storage: storage });

router.post('/new', upload.array('images', 10), async (req, res) => {
    const { name, price, description, rating, quote } = req.body;

    const images = req.files.map(file => file.public_id);

    const product = new Product({
        name,
        price,
        images,
        description,
        rating,
        quote,
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
