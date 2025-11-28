const { validationResult } = require('express-validator');
const productService = require('../services/productService');

exports.addProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const imagePath = req.file ? req.file.filename : null;

    const data = {
        ...req.body,
        image: imagePath
    };

    const result = await productService.addProduct(data);
    res.send(result);
};

exports.listProducts = async (req, res) => {
    const products = await productService.listProducts();
    if (!products) return res.send({ result: "No Product Found" });

    res.send(products);
};

exports.deleteProduct = async (req, res) => {
    const result = await productService.deleteProduct(req.params.id);
    res.send(result);
};

exports.getProduct = async (req, res) => {
    const response = await productService.getProduct(req.params.id);

    if (response?.invalid)
        return res.status(400).send({ result: "Invalid Product ID" });

    if (!response)
        return res.send({ result: "No Product Found" });

    res.send(response);
};

exports.updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const result = await productService.updateProduct(req.params.id, req.body);
    res.send(result);
};

exports.searchProduct = async (req, res) => {
    const result = await productService.searchProduct(req.params.key);
    res.send(result);
};
