const Product = require('../model/product');

exports.createProduct = async (data) => {
    const product = new Product(data);
    return await product.save();
};

exports.getAllProducts = async () => {
    return await Product.find();
};

exports.deleteProduct = async (id) => {
    return await Product.deleteOne({ _id: id });
};

exports.getProductById = async (id) => {
    return await Product.findOne({ _id: id });
};

exports.updateProduct = async (id, data) => {
    return await Product.updateOne(
        { _id: id },
        { $set: data }
    );
};

exports.searchProducts = async (key) => {
    return await Product.find({
        "$or": [
            { name: { $regex: key, $options: "i" } },
            { company: { $regex: key, $options: "i" } }
        ]
    });
};
