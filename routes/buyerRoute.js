const express = require('express');
const rt = express.Router();
const Product = require('../models/productModel')
const Buyer = require('../models/buyerModel');
const Bid = require('../models/bidModel');

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
            const nowDate = new Date();
            const endDate = new Date(price.endDate);
            const diffDay = (endDate.getTime() - nowDate.getTime())/(1000*3600*24);

            if(diffDay <= 0) {
                res.send({ message: "The bid ended on " +  endDate.toString().substring(4, 15) })
            } else {
                if(req.body.bidAmount > price.price) {
                    const newBid = await bid.save();
                    res.status(201).json(newBid)
                    const setTrue = await Product.findByIdAndUpdate(req.body.productId, {bid: true});
                } else {
                    res.json({ message: "Your bid is too low. The starting price is: $" + price.price})
                }    
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

        const oldBid = await Bid.find(query)

        if(req.params.newBidAmount > oldBid[0].bidAmount) {
            const buyer = await Bid.findOneAndUpdate(query, newBid)
            res.status(201).json(buyer)
        } else {
            res.send({ message: "Your bid is too low. Must be higher than " + oldBid[0].bidAmount})
        }
        

        
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

//GET A BUYER BY UNIQUE ID
rt.get('/:id', getBuyer, (req, res) => {
    const buyer = getBuyerById(req.params.id)
    res.send(buyer);
});

function getBuyerById(id) {
    return Buyer.find(id)
}

//MIDDLEWARE FOR UNIQUE BUYER
async function getBuyer(req, res, next){
    let buyer;
    try {
        buyer = await Buyer.findById(req.params.id);
        if(buyer == null) {
            return res.status(404).json({ message: 'Cannot find BUYER'});
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.buyer = buyer;
    next();
}

module.exports = {
    buyerRouter: rt,
    getBuyerById
};
