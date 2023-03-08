const axios = require('axios');
const {getRole} = require('../services/user.services.js');


const authServiceRegister = async(req, res, next) => {
    const {username, password} = req.body;
    if(!username || !password) {
        return res.json({message: 'missing username or password'});
    }
    try{
        await axios({
            baseURL: 'http://localhost:4000',
            url: '/register',
            method: 'post',
            data: {
                username: username,
                password: password
            }
        });
    }
    catch(err){
        return res.json({message: 'authentication issue'});
    }
    next();
};

const authServiceLogin = async(req, res) => {
    const {username, password} = req.body;
    const role = await getRole(username);
    if(!username || !password) {
        return res.json({message: 'missing username or password'});
    }
    try{
        const userData = await axios({
            baseURL: 'http://localhost:4000',
            url: '/login',
            method: 'post',
            data: {
                username: username,
                password: password,
                role: role
            }
        });
        res.json({token: userData.data.token});
    }
    catch(err){
        res.json({message: 'authentication issue'});
    }
};

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

module.exports = {validate, authServiceRegister, authServiceLogin};