const express = require('express');
const bcrypt = require('bcrypt');
const { application } = require('express');
require('dotenv').config()
const router = express();

const jsonParser = express.json();

router.get("/products", jsonParser,  async function(req, res){
    try {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' })
    } catch (e) {
        console.log(e)
    }
})

router.post("/products", jsonParser, async function (req, res){
    try{
    } catch (e) {
        console.log (e)
    }
})

router.patch("/products", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})

router.put("/products", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})

router.delete("/products", jsonParser, async function (req, res){
    try {

    } catch (e) {
        console.log(e)
    }
})