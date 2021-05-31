const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    orderId: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('order', orderSchema)