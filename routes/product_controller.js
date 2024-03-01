const db = require('../models/product_model')

module.exports = {
    getProducts: async function (req,res) {
            try {
                res.json(await db.getProducts())
            } catch (e) {
                console.error(e)
        }
    },
    postProducts: async function (req, res){
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
    },
    changeProduct: async function (req, res){
        try {
            if(!req.body) return res.sendStatus(400);
            const productId = req.params.id 
            res.json(await db.changeProduct(productId, req.body))
        } catch (e) {
            console.error(e)
        }
    },
    deleteProduct: async function (req, res){
        try {
            if(!req.params) return res.sendStatus(400);
            res.json(await db.deleteProduct(req.params.id))
        } catch (e) {
            console.error(e)
        }
    }

}