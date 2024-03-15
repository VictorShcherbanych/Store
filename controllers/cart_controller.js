class cartController {
    constructor({cartModel}) {
        this.cartModel = cartModel
    }
    getCart = async (req, res) => {
        console.log(req.body)
        try {
            const userId = req.body.userId
            res.json(await this.cartModel.getCart(userId))
        } catch (e) {
            console.error(e)
        }
    }
    addProduct = async (req, res) => {
        try {
            const {
                body,
                body: {
                    userId,
                    productId,
                    quantity,
                }
            } = req;


            const cart = await this.cartModel.getCart(userId)
            if (!cart[0]) await this.cartModel.createCart(userId)
            if (!body) return res.status(400).send('Не вказано бажаних позицій');

            res.json(await this.cartModel.addToCard(userId, productId, quantity))
        } catch (e) {
            console.error(e)
        }
    }
    removeProduct = async (req, res) => {
        try {
            const {
                userId,
                product_id
            } = req.body;

            res.json({ success: await this.cartModel.removeFromCart(userId, product_id) });
        } catch (e) {
            console.error(e)
        }
    }
    updateQuantity = async (req, res) => {
        try {
            const cartId = req.body.cartId
            const productid = req.body.productId
            const newQuantity = req.body.newQuantity
            res.json(await this.cartModel.updateQuantity(cartId, productid, newQuantity))
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = cartController