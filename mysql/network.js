const router = require('express').Router();
const store = require('../store/mysql');
const { success } = require('../network/response');

router.get('/:table', async (req, res)=> {
  const data = await store.list(req.params.table)
  success(res, data, 200)
})

router.get('/:table/:id', async (req, res)=> {
  const data = await store.get(req.params.table, req.params.id)
  success(res, data[0], 200)
})

router.post('/:table', async (req, res)=> {
  const data = await store.upsert(req.params.table, req.body)
  success(res, data, 200)
})

router.put('/:table', async (req, res)=> {
  const data = await store.update(req.params.table, req.body)
  success(res, data, 200)
})

module.exports = router;