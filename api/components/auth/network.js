const router = require('express').Router()
const controller = require('./index');
const { success, fail } = require('../../../network/response')

router.post('/login', (req, res, next)=> {
  controller.login(req.body.username, req.body.password)
  .then(data=> success(res, data, 201))
  .catch(next)
})

module.exports = router;

