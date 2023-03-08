const express = require('express');

const controllers = require('../controllers/user.controller.js');
const {validate, authServiceRegister, authServiceLogin} = require('../middlewares/authentication.js');

const userRouter = express.Router();

userRouter.post('/register', authServiceRegister, controllers.register);
userRouter.post('/login', authServiceLogin);
userRouter.post('/cart', validate , controllers.addToCart);
userRouter.get('/cart', validate, controllers.getCartProducts);
userRouter.delete('/cart/:id', validate, controllers.deleteCartProduct);

module.exports = userRouter;