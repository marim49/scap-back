const pool = require('../lib/pool')

module.exports = {

    async getUser(cpf) {
        return new Promise(function(res,rej){
            pool.getConnection(function(err, connection) {           
            if (err) throw err; // not connected!        
            const select = `SELECT id, nome, cpf, password FROM usuario 
                            WHERE cpf = ? `
            const values = [cpf]
            let results = connection.query(select, values, function(error, results, fields){
                connection.release();
                // Handle error after the release.
                if (error) throw error
            })
            return results.length === 1 ? results : null 
            })
        })
    },

    async createUser(name, cpf, address, occupation, email, password) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            const insert = `INSERT INTO usuario (nome, cpf, endereco, profissao, email, password)
                            VALUES(?, ?, ?, ?, ?, ?);`
            const values = [name, cpf, address, occupation, email, password]
            
                let results = connection.query(insert, values, function(error, results, fields){
                    connection.release();
                    // Handle error after the release.
                    if (error) throw error;
                })
                return results
        })
        return 
    },

    async getLogar(cpf, senha) {
        let query = `
            SELECT cpf, password
            FROM usuario
            WHERE cpf = $cpf
            AND senha = $senha
        `
        let parameters = {cpf, senha}
        let results = await pool.query(query, parameters)
        return results.rows.length === 1 ? results.rows[0] : null
    },
    
}