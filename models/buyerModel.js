const mg = require('mongoose');

const buyerSchema = new mg.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxLength: 25,
        required: true
    }, 
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: String,
        minLength: 4,
        maxLength: 6
    },
    phone: {
        type: String,
        minLength: 10,
        maxLength: 10
    },
    email: {
        type: String,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        required: true
    },
    productId: {
        type: String   
    },
    bidAmount: {
        type: Number
    }
});

module.exports = mg.model('Buyer', buyerSchema);