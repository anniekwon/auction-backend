const express = require('express');
const rt = express.Router();
const Product = require('../models/productModel');
const Bid = require('../models/bidModel');
const Buyer = require('../models/buyerModel');
const { restart } = require('nodemon');

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

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
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

// //GET ALL BIDS ON AN UNIQUE PRODUCT AS A SELLER
// rt.get('/show-bids/:productId', getProduct, async (req, res) => {
//     try {
//         const query = { productId: req.params.productId }
//         const sortByBid = { bidAmount: -1}
//         const product = res.product;
//         const bids = await Bid.find(query).sort(sortByBid)
//         res.json({product, bids});
//     } catch(err) {
//         res.status(500).json({ message: err.message });
//     }
// })

//GET ALL BIDS ON AN UNIQUE PRODUCT AS A SELLER
rt.get('/show-product/:productId', getProduct, async (req, res) => {
    try {
        res.send([res.product]);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

//GET ALL BIDS ON AN UNIQUE PRODUCT AS A SELLER
rt.get('/show-bids/:productId', async (req, res) => {
    let arr = []

    try {
        const bidQuery = { productId: req.params.productId };
        const sortByBid = { bidAmount: -1 };
        const bids = await Bid.find(bidQuery).sort(sortByBid);

        for(let i=0; i<bids.length; i++) {
            let buyerQuery = { email: bids[i].email };
            let buyers = await Buyer.find(buyerQuery);
            
            let x = {
                bidAmount: bids[i].bidAmount,
                firstName: buyers[0].firstName,
                email: buyers[0].email,
                phone: buyers[0].phone
            }

            arr.push(x)
        }

        res.send(arr);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
});

//GET ALL BIDS ON AN UNIQUE PRODUCT AS A SELLER
// rt.get('/show-bids/:productId', async (req, res) => {
//     try {
//         const query = { productId: req.params.productId };
//         const sortByBid = { bidAmount: -1}
//         const bids = await Bid.find(query).sort(sortByBid)
//         res.json(bids)

//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

//GET ALL BUYERS ON AN UNIQUE PRODUCT AS A SELLER
// rt.get('/show-buyers/:productId', async (req, res) => {
//     try {
//         const emailQuery = { productId: req.params.productId };
//         const sorter = { bidAmount: -1 }
//         const buyersByEmail = await Bid.find(emailQuery).sort(sorter)
//         let arr = []
//         const emailId = buyersByEmail.map((value) => {

//             let x = { email: value.email }
//             return x

//         })
//         for(let i=0; i< emailId.length; i++) {
//             let a = await Buyer.find(emailId[i]);
//             arr.push(a[0])
//         }
       
//         res.json(arr)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

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