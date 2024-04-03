class CartController {

    constructor({ CartModel }) {
        this.CartModel = CartModel
    }

    getCart = async (req, res) => {
        try {
            const userId = req.body.userId

            res.json(await this.CartModel.getCart(userId))
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

            const cart = await this.CartModel.getCart(userId)
            if (!cart[0]) await this.CartModel.createCart(userId)
            if (!body) return res.status(400).send('Не вказано бажаних позицій');

            res.json(await this.CartModel.addToCard(userId, productId, quantity))
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

            res.json({ success: await this.CartModel.removeFromCart(userId, product_id) });
        } catch (e) {
            console.error(e)
        }
    }

    updateQuantity = async (req, res) => {
        try {
            const cartId = req.body.cartId
            const productid = req.body.productId
            const newQuantity = req.body.newQuantity

            res.json(await this.CartModel.updateQuantity(cartId, productid, newQuantity))
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = CartController