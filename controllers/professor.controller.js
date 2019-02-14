const routes = require('express').Router()
const wrap = require('../lib/wrap')
const professorHelper = require('../helpers/professor.helper')



/*
** Disciplina
*/
routes.get('/professor', wrap(async (req, res) => {
    let results = await professorHelper.getProfessores()
    res.json(results)
}))


module.exports = routes
