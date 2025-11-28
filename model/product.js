const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    userId: String,
    category:String,
    company:String,
    image: {           
        type: String,
        required: false // optional, set true if image must be uploaded
    }
});

module.exports = mongoose.model('Product', productSchema, 'products');