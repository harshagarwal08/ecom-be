const services = require('../services/product.services');

const getProducts = async(req, res) => {
    try{
        const products = await services.getProducts();
        res.json({
            products: products
        });
    }
    catch(err){
        console.log(err);
    }
};

const addProduct = async(req, res) => {
    try{
        const {body} = req;
        const product = await services.addProduct(body);
        res.status(201).json({
            product: product
        });
    }
    catch(err){
        res.json({message: err.message});
    }
};

module.exports = {getProducts, addProduct};