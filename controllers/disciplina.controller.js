const routes = require('express').Router()
const wrap = require('../lib/wrap')
const disciplinaHelper = require('../helpers/disciplina.helper')



/*
** Disciplina
*/
routes.get('/disciplina', wrap(async (req, res) => {
    let results = await disciplinaHelper.getDisciplinas()
    res.json(results)
})),

routes.post('/create', (req, res) => {
    let { descricao, codigo } = req.body
    disciplinaHelper.createDisciplina(descricao, codigo)
    
})


module.exports = routes
