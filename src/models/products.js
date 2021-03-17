const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    lost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})
module.exports = model('product', schema)