const express = require('express');
const app = express();

const router = require('./network')

//SETTINGS
const { mysqlService } = require('../config');

//MIDDLEAWARES
app.use(express.json())

//ROUTES
app.use('/', router)

//INITIALIZATION
app.listen(mysqlService.port,()=> {
  console.log('mysql service listening on port', mysqlService.port)
})