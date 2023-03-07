const express = require('express');

const controllers = require('../controllers/user.controller.js');
const {validate} = require('../middlewares/authentication.js');

const userRouter = express.Router();

userRouter.post('/cart', validate , controllers.addToCart);
userRouter.get('/cart', validate, controllers.getCartProducts);
userRouter.delete('/cart/:id', validate, controllers.deleteCartProduct);

module.exports = userRouter;