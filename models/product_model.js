class productModel {
    constructor({db}) {
        this.db = db
    }

    getProducts = async function () {
        try {
            console.log(this.db)
            const products = await this.db('products')
                .select('*')
            return products
        } catch (e) {
            console.error(e);
        }
    }
    postProducts = async function (name, price, picture, description) {
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
    changeProduct = async function (id, newData) {
        try {
            await this.db('products')
                .where({ uuid: id })
                .update(newData)
        } catch (e) {
            console.error(e)
        }
    }
    deleteProduct = async function (id) {
        try{
            await this.db('products')
                .where({ uuid: id})
                .del()
        } catch (e) {
            console.error(e)
        }
    }
    createUser = async function createUser (login, password, email, phonenumber){
        try{
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
    }
    getUser = async function getUser(login){
        try{
            const user =  await db('users')
            .where('login', login)
            return user
        } catch (e) {
            console.error(e)
    }
    },
    getUser = async function getUser(login){
        try{
            const user =  await db('users')
            .where('login', login)
            return user
        } catch (e) {
            console.error(e)
        }
    }        

module.exports = productModel