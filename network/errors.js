const response = require('./response');

module.exports = (err, req, res, next)=> {
  console.error(err)

  const message = err.message || 'Internal Error'
  const status = err.statusCode || 500

  response.fail(res, message, status)

}