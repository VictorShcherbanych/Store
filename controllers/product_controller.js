

class ProductController {

    constructor({ ProductModel }) {
        this.ProductModel = ProductModel;
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.ProductModel.getProducts()
            res.json(products)
            return products
        } catch (e) {
            throw new Error(e)
        }
    }

    getProductswithId = async (req, res) => {
        try {
            const productId = req.params.productId
            const product = await this.ProductModel.getProductWithId(productId)
            res.json(product)
            return product
        } catch (e) {
            throw new Error('Fuck')
        }
    }


    postProducts = async (req, res) => {
        try {

            if (!req.body) return res.sendStatus(400);

            const name = req.body.name;
            const price = req.body.price
            const picture = req.body.picture
            const description = req.body.description
            const newProduct = await this.ProductModel.postProducts(name, price, picture, description)
            res.json(newProduct)

        } catch (e) {
            console.error(e)
        }
    }

    changeProduct = async (req, res) => {
        try {
            if (!req.body) return res.sendStatus(400);
            console.log(req)
            const productId = req.params.productId
            res.json(await this.ProductModel.changeProduct(productId, req.body))
        } catch (e) {
            throw new Error('Fuck')
        }
    }

    deleteProduct = async (req, res) => {
        try {
            if (!req.params) return res.sendStatus(400);
            res.json(await this.ProductModel.deleteProduct(req.params.productId))
        } catch (e) {
            console.error(e)
        }
    }

}

module.exports = ProductController