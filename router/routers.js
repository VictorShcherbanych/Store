const express = require('express');
const { application } = require('express');
require('dotenv').config()
const router = express();
const db = require('../models/abstract_model')

const jsonParser = express.json();

router.get("/api/products", jsonParser,  async function(req, res){
    try {
        res.json(await db.getProducts())
    } catch (e) {
        console.log(e)
    }
})

router.post("/api/products", jsonParser, async function (req, res){
    try{
        if(!req.body) return res.sendStatus(400);
        const name = req.body.name;
        const price = req.body.price
        const picture = req.body.picture
        const description = req.body.description
        res.json(await db.postProducts(name, price, picture, description))
    } catch (e) {
        console.log (e)
    }
})

router.patch("/api/products", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})

router.put("/api/products/:id", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})

router.delete("/api/products/:id", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})

module.exports = router