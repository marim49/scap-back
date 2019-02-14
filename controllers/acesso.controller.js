const routes = require('express').Router()
const acessoHelper = require('../helpers/acesso.helper')
var jwt = require('jsonwebtoken');


// routes.get('/logar', (req, res) => {
//     let response = await acessoHelper.getLogar()
// });

routes.post('/logar', (req, res) => {
    let { cpf, password } = req.body
    if (!cpf || !password) {
        res.send('outro erro')
        //res.render('account/logar', { error: 'Preencha todos os campos' });
    }
    let userData = acessoHelper.checkPassword(cpf, password)
    if (userData) {
        let token = jwt.sign({ id: userData.id, name: userData.name  }, '- SENHA -');

        console.log('logou !!!')
        console.log(token)

        res.json(token)
        // criar sessao
        // res.redirect('/'); // redirect to dashboard
    } else {
        console.log('n deu ;-;')
        res.sendStatus(401)
    }
});



routes.post('/cadastrar', (req, res) => {
    console.log('chegou controller')
    let { name, cpf, address, occupation, email, password } = req.body
    acessoHelper.createAccount(name, cpf, address, occupation, email, password)
    
});

routes.get('/recuperar', (req, res) => {
    res.render('account/recuperar')
});


module.exports = routes
