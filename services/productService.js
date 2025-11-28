const mongoose = require('mongoose');
const productRepo = require('../repositories/productRepository');

exports.addProduct = async (data) => {
    return await productRepo.createProduct(data);
};

exports.listProducts = async () => {
    const products = await productRepo.getAllProducts();
    if (products.length === 0) return null;
    return products;
};

exports.deleteProduct = async (id) => {
    return await productRepo.deleteProduct(id);
};

exports.getProduct = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return { invalid: true };
    }

    const product = await productRepo.getProductById(id);
    if (!product) return null;

    return product;
};

exports.updateProduct = async (id, data) => {
    return await productRepo.updateProduct(id, data);
};

exports.searchProduct = async (key) => {
    return await productRepo.searchProducts(key);
};
