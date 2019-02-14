const disciplinaDB = require('../db/disciplina.db')
const logger = require('../lib/logger')

module.exports = {

    async getDisciplinas() {
        console.log('chegou helper')
        console.log(await disciplinaDB.getDisciplinas())
        return  await disciplinaDB.getDisciplinas()
        
    },

    async createDisciplina(descricao, codigo){
            return disciplinaDB.createDisciplina(descricao, codigo)
        
    },
}
