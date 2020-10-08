const TABLE = 'post';
const { nanoid } = require('nanoid');

module.exports = (injectedStore) => {
  const store = injectedStore || require('../../../store');

  const list = () => store.list(TABLE)
  
  const get = (id) => store.get(TABLE, id)

  const upsert = (data) => {
    const post = {
      id: nanoid(),
      title: data.title,
      user: data.user
    }
    return store.upsert(TABLE, post)
  }

  const update = (data) => {
    const post = {
      title: data.title,
      user: data.user
    }
    return store.update(TABLE, post)
  }

  return {
    list,
    get,
    upsert,
    update
  }
}