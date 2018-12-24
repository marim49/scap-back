const winston = require('winston')
const moment = require('moment')

const level = process.env.LOG_LEVEL || 'debug'

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level,
            colorize: true,
            timestamp () {
                return moment().format()
            }
        })
    ]
})

module.exports = logger
