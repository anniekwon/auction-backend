const mg = require('mongoose');

const productSchema = new mg.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String
    },
    bid: {
        type: Boolean
    }
});

module.exports = mg.model('Product', productSchema);