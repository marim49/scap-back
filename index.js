const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const logger = require('./lib/logger')
const routes = require('./lib/routes')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load()
}

const PORT = process.env.PORT || 3000

function errorHandler (err, req, res, next) {
    logger.error(err)
    res.sendStatus(500)
}

express()
    .use(morgan('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api', routes)
    .use(errorHandler)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => logger.info(`Listening on ${PORT}`))
