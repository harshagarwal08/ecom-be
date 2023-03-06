const services = require('../services/user.services');
const addToCart = async(req, res) => {
    try{
        const user = req.user;
        const {products} = req.body;
        await services.addToCart(user, products);
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

module.exports = {addToCart};