class productModel {
    constructor({ db }) {
        this.db = db
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
            const products = await this.db('products')
                .insert({
                    name: name,
                    price: price,
                    picture: picture,
                    description: description
                })
            return products
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
            console.error(e)
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
    createUser = async (login, password, email, phonenumber) => {
        try {
            await db('users')
                .insert({
                    login: login,
                    password: password,
                    email: email,
                    phonenumber: phonenumber,
                    role: "role"
                });
        } catch (e) {
            console.error(e)
        }
    }
    getUser = async (login) => {
        try {
            const user = await db('users')
                .where('login', login)
            return user
        } catch (e) {
            console.error(e)
        }
    }
}
module.exports = productModel