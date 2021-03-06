exports.success = (res, message, status) => {
  let statusCode = status || 200;
  let statusMessage = message || 'ok'

  res.status(statusCode).json({
    error: false,
    status: statusCode,
    body: statusMessage
  })
}

exports.fail = (res, message, status) => {
  let statusCode = status || 500;
  let statusMessage = message || 'Internal server error'

  res.status(statusCode).json({
    error: true,
    status,
    body: statusMessage
  })
}