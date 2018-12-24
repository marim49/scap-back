const routes = require('express').Router()
const wrap = require('../lib/wrap')
const cadastroHelper = require('../helpers/cadastro.helper')
const jwt = require('jsonwebtoken');


/*
** Empreendedor
*/
routes.get('/empreendedor', wrap(async (req, res) => {
    let token =  jwt.decode(req.headers.authorizaton)
    console.log(token.id)
    let id = token.id
    let results = await cadastroHelper.getEmpreendedores(id)
    res.json(results)
}))

routes.post('/empreendedor', wrap(async (req, res) => {
    let empreendedor = req.body
    let token =  jwt.decode(req.headers.authorizaton)
    empreendedor.usuarioId = token.id
    await cadastroHelper.createEmpreendedor(empreendedor)
    res.sendStatus(204)
}))

/*
** Empreendimento
*/
routes.get('/empreendimento', wrap(async (req, res) => {
    let token = jwt.decode(req.headers.authorizaton)
    let id = token.id
    let results = await cadastroHelper.getEmpreendimentos(id)
    res.json(results)
}))

routes.post('/empreendimento', wrap(async (req, res) => {
    let token =  jwt.decode(req.headers.authorizaton)
    let empreendimento = req.body
    empreendimento.usuarioId = token.id
    let response = await cadastroHelper.createEmpreendimento(empreendimento)
    res.json(response)
}))

module.exports = routes
