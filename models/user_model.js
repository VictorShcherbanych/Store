const db = require('../db-config/index')

module.exports =  {
    createUser: async function createUser (login, password, email, phonenumber){
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
    },
    getUser: async function getUser(login){
        try{
            const user =  await db('users')
            .where('login', login)
            return user
        } catch (e) {
            console.error(e)
        }
    }
}