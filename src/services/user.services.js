const {User} = require('../../database/models');

const addToCart = async(user, products) => {
    const {username} = user;
    const registeredUser = await User.findOne({where: {
        username,
    }});
    if(!registeredUser) return await User.create({username, cart: products});
    const newCart = [...registeredUser.dataValues.cart, ...products];
    await registeredUser.update({
        cart: newCart
    });
};

module.exports = {addToCart};