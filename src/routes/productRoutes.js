const express = require('express');

const controllers = require('../controllers/product.controller.js');
const {validate} = require('../middlewares/authentication.js');

const productRouter = express.Router();

productRouter.get('/', validate , controllers.getProducts);
productRouter.post('/', validate, controllers.addProduct);

module.exports = productRouter;