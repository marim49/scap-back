const routes = require('express').Router()
const fs = require('fs')

const controllersFolder = './controllers'

// Map each controller to a route with the same name
fs.readdirSync(controllersFolder).forEach(file => {
    let match = file.match(/^(.+)\.controller\.js$/)
    if (match) {
        let routeName = `/${match[1]}`
        let controller = require(`../${controllersFolder}/${file}`); // eslint-disable-line
        routes.use(routeName, controller)
    }
})

module.exports = routes
