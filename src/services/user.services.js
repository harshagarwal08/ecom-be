const {User, Product} = require('../../database/models');

const register = async(body) => {
    const user = await User.create({
        username: body.username,
        role: body.role,
    });
    return user;
};


const getRole = async(username) => {
    const user = await User.findOne({
        where: {
            username,
        }
    });
    return user.dataValues.role;
};

const addToCart = async(user, product) => {
    const {username} = user;
    const registeredUser = await User.findOne({where: {
        username,
    }});
    if(!registeredUser) return await User.create({username, cart: [product]});
    if(registeredUser.dataValues.cart===null)  await registeredUser.update({
        cart: [product]
    });
    const newCart = [...registeredUser.dataValues.cart, product];
    await registeredUser.update({
        cart: newCart
    });
};

const getCartProducts = async(username) => {
    const data = await User.findOne({
        where: {
            username,
        }
    });
    const products = await Promise.all(data.dataValues.cart.map((id)=> Product.findOne({
        where: {
            id: id,
        }
    })));
    const response = products.map((product)=>product.dataValues);
    return response;
};

const deleteCartProduct = async(username, id) => {
    const user = await User.findOne({
        where: {
            username,
        }
    });
    user.dataValues.cart = user.dataValues.cart.filter((productId)=>productId!==id);
    await User.update(
        {
            cart: user.dataValues.cart
        },
        {
            where: {
                username: username,
            }
        }
    );
};

module.exports = {addToCart, getCartProducts, deleteCartProduct, getRole, register};