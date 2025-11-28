const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {addProductValidation, updateProductValidation } = require('../validators/productValidators');

const {
    addProduct,
    listProducts,
    deleteProduct,
    getProduct,
    updateProduct,
    searchProduct
} = require('../controllers/productController');



router.post('/add-product', verifyToken, addProductValidation, addProduct);
router.get('/list-product', verifyToken, listProducts);
router.get('/product/:id', verifyToken, getProduct);
router.put('/product/:id', verifyToken, updateProductValidation, updateProduct);
router.delete('/delete-product/:id', verifyToken, deleteProduct);
router.get('/search/:key', verifyToken, searchProduct);

module.exports = router;