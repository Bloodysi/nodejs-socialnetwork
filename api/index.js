const express = require('express')
const app = express()

const userRouter = require('./components/user/network')
const authRouter = require('./components/auth/network')
const postRouter = require('./components/post/network')

const errors = require('../network/errors');

//SWAGGER
const swagger = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')

//SETTINGS
const config = require('../config.js')

//MIDDLEAWARES
app.use(express.json())

//ROUTER
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)
app.use('/', swagger.serve, swagger.setup(swaggerDoc))
app.use(errors)


app.listen(config.api.port, ()=> console.log('api listening on port', config.api.port))