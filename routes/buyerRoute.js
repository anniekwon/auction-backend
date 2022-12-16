const express = require('express');
const rt = express.Router();
const Product = require('../models/productModel')
const Buyer = require('../models/buyerModel');
const Bid = require('../models/bidModel');
const { restart } = require('nodemon');

//PLACES A BID ON AN UNIQUE PRODUCT AS A BUYER
rt.post('/place-bid', async (req, res) => {
    try {
        const query = { productId: req.body.productId, email: req.body.email }
        const result = await Bid.find(query)

        if(result.length > 0) {
            res.json({ message: "You already place your bid."})
        } else {
            const bid = new Bid({
                email: req.body.email,
                productId: req.body.productId,
                bidAmount: req.body.bidAmount
            });
            
            const price = await Product.findById(req.body.productId);
            const nowDate = Date();
            console.log(nowDate)
            if(req.body.bidAmount > price.price) {
                const newBid = await bid.save();
                res.status(201).json(newBid)
            } else {
                res.json({ message: "Your bid is too low. The starting price is: " + price.price})
            }         
        }
        
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

//UPDATES A BID ON AN UNIQUE PRODUCT AS A BUYER
rt.patch('/update-bid/:productId/:buyerEmailId/:newBidAmount', async (req, res) => {
    try {
        const query = { productId: req.params.productId, email: req.params.buyerEmailId }
        const newBid = { bidAmount: req.params.newBidAmount }
        const product = res.product
        const buyer = await Bid.findOneAndUpdate(query, newBid)

        res.json(buyer)

    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})
module.exports = rt
