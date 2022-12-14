const express = require('express');
const rt = express.Router();
const Product = require('../models/productModel');
const Bid = require('../models/bidModel');
const Buyer = require('../models/buyerModel')

//GET ALL PRODUCTS AS A SELLER 
rt.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//ADD A NEW PRODUCT AS A SELLER
rt.post('/add-product', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        endDate: req.body.endDate,
        bid: false
    })
})

//DELETE A PRODUCT AS A SELLER 
rt.delete('/delete/:productId', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted Product' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//GET ALL BIDS ON AN UNIQUE PRODUCT AS A SELLER
rt.get('/show-bids/:productId', getProduct, async (req, res) => {
    try {
        const query = { productId: req.params.productId }
        const sortByBid = { bidAmount: -1}
        const product = res.product;
        const bids = await Bid.find(query).sort(sortByBid)
        res.json({product, bids});
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

//MIDDLEWARE FOR AN UNIQUE PRODUCT
async function getProduct(req, res, next) {
    let product;
    
    try {
        product = await Product.findById(req.params.productId);
        if(product == null) {
            return res.status(404).json({ message: 'Cannot find the product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}


//MIDDLEWARE FOR
module.exports = rt