const {Router} = require('express')
const administration = require('./administration/administration')
const frontend = require('./frontend/frontend')

const api = Router()

api.use('/frontend', frontend)
api.use('/administration', administration)

module.exports = api