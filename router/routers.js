const express = require('express');
const { application } = require('express');
require('dotenv').config()
const router = express();
const db = require('../models/abstract_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const middleware = require('../middleware')
const {check, validationResult } = require ('express-validator');


const jsonParser = express.json();

function generateToken(user) {
    return jwt.sign(user, process.env.secret_key, { expiresIn: '1h' });
}

router.get("/api/products", jsonParser, middleware,  async function(req, res){
    try {
        res.json(await db.getProducts())
    } catch (e) {
        console.error(e)
    }
})

router.post("/api/products", jsonParser, middleware, async function (req, res){
    try{
        if(!req.body) return res.sendStatus(400);
        const name = req.body.name;
        const price = req.body.price
        const picture = req.body.picture
        const description = req.body.description
        res.json(await db.postProducts(name, price, picture, description))
    } catch (e) {
        console.error(e)
    }
})

router.post('/api/login', jsonParser, async (req, res) => {
    try {
        const user = await db.getUser(req.body.login)
        if (!user) return res.status(400).send('Email or password is wrong');
        const validPassword = bcrypt.compareSync(req.body.password, user[0].password);
        if (!validPassword) return res.status(400).send('Email or password is wrong');

        // Генерація та повернення JWT токену
        const token = generateToken({ id: user.id, login: user.login });
        res.header('authorization', token).send(token);
    } catch (err) {
        console.error(err)
    }
});

router.post('/api/register', jsonParser,
    check('login', 'Поле логіну не може бути порожнім').notEmpty(),
    check('password', 'Пароль повинен мати від 4 до 12 символів').isLength({min:4, max:12}),
    check('email', 'Email некоректний').matches(/[@]/), async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Помилка при реєстрації', errors})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Збереження користувача в базі даних
        await db.createUser(req.body.login, hashedPassword, req.body.email, req.body.phonenumber)
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err)
    }
});

router.put("/api/products/:id", jsonParser, middleware, async function (req, res){
    try {
        if(!req.body) return res.sendStatus(400);
        const productId = req.params.id 
        res.json(await db.changeProduct(productId, req.body))
    } catch (e) {
        console.error(e)
    }
})

router.delete("/api/products/:id", jsonParser, middleware, async function (req, res){
    try {
        if(!req.params) return res.sendStatus(400);
        res.json(await db.deleteProduct(req.params.id))
    } catch (e) {
        console.error(e)
    }
})

module.exports = router