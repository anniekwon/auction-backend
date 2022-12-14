require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const mg = require('mongoose');

const url = process.env.EA_DB;

const sQ = mg.set('strictQuery', true);

mg.connect(url);

const db = mg.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'));

//ALLOW CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

//SELLER ROUTE
const sellerRouter = require('./routes/sellerRoute');
app.use('/e-auction/api/v1/seller', sellerRouter);

// //BUYER ROUTE
// const buyerRouter = require('./routes/buyerRoute');
// app.use('/e-auction/api/v1/buyer', buyerRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server has started on ' + port));