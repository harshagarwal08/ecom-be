const express = require('express');

const controllers = require('../controllers/user.controller.js');
const {validate} = require('../middlewares/authentication.js');

const userRouter = express.Router();

userRouter.post('/cart', validate , controllers.addToCart);

module.exports = userRouter;