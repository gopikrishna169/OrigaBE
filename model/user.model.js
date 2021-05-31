const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    noOfOrder: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('user', userSchema)