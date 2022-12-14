const mg = require('mongoose');

const bidSchema = new mg.Schema({
    email: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    }
})

module.exports = mg.model("Bid", bidSchema)