const productModel = require("../models/product_model");
const a = new productModel

class productController {
    constructor({productModel}) {
        this.productModel = productModel;
    }
    getProducts = async function (req,res) {
            try {
                res.json(a.getProducts())
            } catch (e) {
                console.error(e)
        }
    }

    postProducts = async function (req, res){
        try{
            if(!req.body) return res.sendStatus(400);
            const name = req.body.name;
            const price = req.body.price
            const picture = req.body.picture
            const description = req.body.description
            res.json(await this.productModel.postProducts(name, price, picture, description))
        } catch (e) {
            console.error(e)
        }
    }

    changeProduct = async function (req, res){
        try {
            if(!req.body) return res.sendStatus(400);
            const productId = req.params.id 
            res.json(await this.productModel.changeProduct(productId, req.body))
        } catch (e) {
            console.error(e)
        }
    }

    deleteProduct = async function (req, res){
        try {
            if(!req.params) return res.sendStatus(400);
            res.json(await this.productModel.deleteProduct(req.params.id))
        } catch (e) {
            console.error(e)
        }
    }

}

module.exports = productController