class userModel  {
    constructor({db}) {
        this.db = db
    }
    createUser = async  (login, password, email, phonenumber) => {
        try{
            await this.db('users')
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
        try{
            const user =  await this.db('users')
            .where('login', login)
            return user
        } catch (e) {
            console.error(e)
        }
    }
}

module.exports = userModel