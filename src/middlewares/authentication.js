const axios = require('axios');

const validate = async(req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.json({message: 'missing token', validated: false});
    }
    try{
        const userData = await axios({
            baseURL: 'http://localhost:4000',
            url: '/validate',
            method: 'get',
            headers: {
                Authorization: token
            }
        });
        req.user = userData.data.user;
    }
    catch(err){
        res.json({message: 'authentication issue'});
    }
    next();
};

const checkAdmin = (req, res, next) => {
    const user = req.user;
    if(user.role !== 'admin') {
        return res.json({
            message: 'unauthorized'
        });
    }
    next();
};

module.exports = {validate, checkAdmin};