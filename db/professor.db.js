const pool = require('../lib/pool')

module.exports = {

    async getProfessores(){
        let p = new Promise(async (resolve, reject) => {
            pool.getConnection(async function (err, connection) {
                let select = `SELECT p.id, p.nome, t.descricao
                FROM professor as p
                join titulacao as t on p.id_titulacao = t.id`
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

}
