const { json } = require('express');
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try{
        const auth = req.headers['authorization'];
        if (!auth) return res.status(401).send('Access Denied');
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Користувач не авторизований"})
        };
        const decodeData = jwt.verify(token, process.env.secret_key);
        req.user = decodeData
        next()
    } catch (e) {
        console.log(e)
        res.json({error: e})
    }
}