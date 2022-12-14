const express = require('express');
const rt = express.Router();
const Buyer = require('../models/buyerModel');
const Bid = require('../models/bidModel');

//PLACES A BID ON AN UNIQUE PRODUCT AS A BUYER
rt.post('/place-bid', async (req, res) => {
    try {
        const query = { productId: req.body.productId, email: req.body.email }
        
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
