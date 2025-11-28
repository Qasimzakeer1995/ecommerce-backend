const { body } = require('express-validator');

exports.addProductValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage("Name must be a string"),

  body('price')
    .notEmpty().withMessage('Product Price is required')
    .isInt().withMessage("Product Price must be a number")
    .toInt(),

  body('category')
    .notEmpty().withMessage('Product category is required')
    .isString().withMessage("Product category must be a string"),

  body('userId')
    .notEmpty().withMessage('userId is required')
    .isString().withMessage("userId must be a string"),

   body('company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage("Company must be a string"),

];

exports.updateProductValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage("Name must be a string"),

  body('price')
    .notEmpty().withMessage('Product Price is required')
    .isInt().withMessage("Product Price must be a number"),

  body('category')
    .notEmpty().withMessage('Product category is required')
    .isString().withMessage("Product category must be a string"),

  body('userId')
    .notEmpty().withMessage('userId is required')
    .isString().withMessage("userId must be a string"),

   body('company')
    .notEmpty().withMessage('Company is required')
    .isString().withMessage("Company must be a string"),

];