const jwt = require('jsonwebtoken');
const config = require('../config')
const secret = config.jwt.secret
const error = require('../utils/error')

function sign(data){
  return jwt.sign({...data}, secret)
}

function verify(token){
  return jwt.verify(token, secret)
}

const check = {
  own: (req, owner)=> {
    const decoded = decodedToken(req)
    if(decoded.id !== owner){
      throw error('you are not allow to do this', 401)
    }
  },
  logged: (req)=> {
    decodedToken(req)
  }
}


function getToken(authorization){
  if(!authorization) throw error('you dont have a token')
  if(authorization.indexOf('Bearer ') === -1){
    throw error('Invalid Code', 400)
  }
  const token = authorization.replace('Bearer ', '')
  return token
}

function decodedToken(req){
  const authorization = req.headers.authorization
  const token = getToken(authorization)
  const decoded = verify(token)
  req.user = decoded;

  return decoded
}



module.exports = {
  sign,
  check
}