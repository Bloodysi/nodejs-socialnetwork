const router = require('express').Router();
const controller = require('./index');
const { success } = require('../../../network/response');

router.get('/', (req, res, next)=> {
  controller.list()
  .then(data=> success(res, data, 200))
  .catch(next)
})

router.get('/:id', (req, res, next)=> {
  controller.get(req.params.id)
  .then(data=> success(res, data[0], 200))
  .catch(next)
})

router.post('/', (req, res, next)=> {
  controller.upsert(req.body)
  .then(data=> success(res, data, 200))
  .catch(next)
})

router.put('/', (req, res, next)=> {
  controller.update(req.body)
  .then(data=> success(res, data, 200))
  .catch(next)
})


module.exports = router;