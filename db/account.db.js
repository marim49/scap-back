const pool = require('../lib/pool')

module.exports = {

    async getUsuario(cpf) {
        let query = `
            SELECT cpf, password
            FROM usuario
            WHERE cpf = $1
        `
        let parameters = [cpf]
        let results = await pool.query(query, parameters)
        return results.rows.length === 1 ? results.rows[0] : null
    },

    async createUser(name, cpf, address, occupation, email, password) {
        let query = `
            INSERT INTO usuario(name, cpf, address, occupation, email, password)
            VALUES($1, $2, $3, $4, $5, $6)
        `
        let parameters = [name, cpf, address, occupation, email, password]
        let results = await pool.query(query, parameters)
        return results
    }
}
