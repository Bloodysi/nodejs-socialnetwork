const router = require('express').Router()
const secure = require('./secure')
const { success, fail } = require('../../../network/response')
const controller = require('./index')

router.get('/', (req, res, next)=> {
  controller.list()
  .then(list => success(res, list, 200))
  .catch(next)
})

router.get('/:id', (req, res, next)=> {
  controller.get(req.params.id)
  .then(user => success(res, user, 200))
  .catch(next)
})

router.post('/', (req, res, next)=> {
  controller.upsert(req.body)
  .then(user => success(res, user, 201))
  .catch(next)
})

router.put('/', secure('update'), (req, res, next)=> {
  controller.update(req.body)
  .then(user => success(res, user, 200))
  .catch(next)
})

//FOLLOW

router.get('/:id/following', secure('follow'), (req, res, next)=> {
  controller.following(req.params.id)
  .then(data=> success(res, data, 200))
  .catch(next)
})

router.post('/follow/:id', secure('follow'), (req, res, next)=> {
  if(!req.user) fail(res, 'theres not user logged', 400)
  controller.follow(req.user.id, req.params.id)
  .then(data=> success(res, data, 200))
  .catch(next)
})

module.exports = router