const crypto = require('crypto')
const acessoDB = require('../db/acesso.db')

const SALT_SIZE = 32

/**
 * generates random string of characters i.e salt
 */
function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length) /** return required number of characters */
}
/**
 * hash password with sha512.
 */
function sha512(password, salt) {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password)
    let value = hash.digest('hex')
    return {
        salt,
        hash: value
    }
}



module.exports = {
    /**
     * Check if the username's password hash match the stored one
     */
    async checkPassword(cpf, password) {
        let row = await acessoDB.getUser(cpf)
        let [salt, passwordHash] = row.password.split(':')
        let passwordData = sha512(password, salt)
        console.log(passwordHash)
        console.log(passwordData.hash)
        if(passwordHash === passwordData.hash) {
            return row
        }
    },

    /**
     * Create account for user
     */
    async createAccount(name, cpf, address, occupation, email, password) {
        console.log('chegou helper')
        let salt = genRandomString(SALT_SIZE)
        let passwordData = sha512(password, salt)
        let storedPasword = `${passwordData.salt}:${passwordData.hash}`
        return acessoDB.createUser(name, cpf, address, occupation, email, storedPasword)
    },

    async getLogar(cpf, senha) {
        return acessoDB.getLogar(cpf, senha)
    }
};