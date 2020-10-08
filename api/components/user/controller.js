const TABLE = 'user';
const { nanoid } = require('nanoid');
const auth = require('../auth')

module.exports = (injectedStore)=> {

  const store = injectedStore;
  if(!store) store = require('../../../store');

  return {
    list: ()=> store.list(TABLE),
    get: (id)=> store.get(TABLE, id),
    upsert: async (data)=> {
      const user = {
        name: data.name,
        username: data.username
      }
      if(!data.id) user.id = nanoid(5)
      else user.id = data.id
      await auth.upsert({id: user.id, data})
      return store.upsert(TABLE, user)
    },
    update: (data)=> store.update(TABLE, data),
    follow: (from, to)=> store.upsert(TABLE + '_follow', {
      user_from: from,
      user_to: to
    }),
    following: (id)=> {
      const join = {}
      join[TABLE] = 'user_to'
      const query = { user_from: id }
      return store.query(TABLE + '_follow', query, join)
    }
  }

}