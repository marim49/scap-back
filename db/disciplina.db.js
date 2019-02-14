const pool = require('../lib/pool')

module.exports = {

    async getDisciplinas(){
        let p = new Promise(async (resolve, reject) => {
            pool.getConnection(async function (err, connection) {
                let select = `SELECT id, descricao, codigo
                FROM disciplina`
                pool.query(select, (err, res) => {
                    if (!err) {
                        resolve(res)
                    }
                    reject(err)
                })
                connection.release();
            })
        })

        let toreturn = await p

        return toreturn

    },

    async createDisciplina(descricao, codigo) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            const insert = `INSERT INTO disciplina (descricao, codigo)
                            VALUES(?, ?);`
            const values = [descricao, codigo]
            
                let results = connection.query(insert, values, function(error, results, fields){
                    connection.release();
                    // Handle error after the release.
                    if (error) throw error;
                })
                return results
        })
        return 
    },

}
