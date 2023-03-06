const {Product} = require('../../database/models');

const addProduct = async(body) => {
    const product = await Product.create(body);
    return product;
};

const getProducts = async() => {
    const products = await Product.findAll();
    return products;
};

module.exports = {addProduct, getProducts};