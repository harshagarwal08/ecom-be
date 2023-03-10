const services = require('../services/user.services');

const register = async(req, res) => {
    try{
        const {body} = req;
        const newUser = await services.register(body);
        res.status(201).json({
            user: newUser
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const addToCart = async(req, res) => {
    try{
        const user = req.user;
        const {product} = req.body;
        await services.addToCart(user, product);
        res.status(201).json({
            message: 'added to cart'
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const getCartProducts = async(req, res) => {
    try{
        const products = await services.getCartProducts(req.user.username);
        res.status(200).json({
            products: products
        });
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
};

const deleteCartProduct = async(req) => {
    const {username} = req.user;
    const {id} = req.params;
    await services.deleteCartProduct(username, id);
};

module.exports = {addToCart, getCartProducts, deleteCartProduct, register};