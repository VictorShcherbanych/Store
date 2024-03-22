class ProductModel {

    constructor({ db }) {
        this.db = db
    }

    getProductWithId = async (productId) => {
        try {
            const product = await this.db('products')
            .where('uuid', productId)
            return product
        } catch (e) {
            console.error(e);
        }
    }

    getProducts = async () => {
        try {
            const products = await this.db('products')
                .select('*')
            return products
        } catch (e) {
            console.error(e);
        }
    }

    postProducts = async (name, price, picture, description) => {
        try {
            const product = await this.db('products')
                .insert({
                    name: name,
                    price: price,
                    picture: picture,
                    description: description
                })
            return product
        } catch (e) {
            console.error(e)
        }
    }

    changeProduct = async (id, newData) => {
        try {
            await this.db('products')
                .where({ uuid: id })
                .update(newData)
        } catch (e) {
            throw Error(e)
        }
    }

    deleteProduct = async (id) => {
        try {
            await this.db('products')
                .where({ uuid: id })
                .del()
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = ProductModel