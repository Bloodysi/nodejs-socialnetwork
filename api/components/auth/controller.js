const TABLE = 'auth';
const auth = require('../../../auth');
const bcrypt = require('bcrypt');
const error = require('../../../utils/error')

module.exports = (injectedStore)=> {
  const store = injectedStore
  if(!store) store = require('../../../store/dummy')

  async function login(username, password){
    const result = await store.query(TABLE, { username: username })
    const data = result[0]
    if(!data) throw error('Invalid Information', 400)
    const hashPassword = await bcrypt.compare(password, data.password)
    if(hashPassword){
      return auth.sign(data)
    }else {
      throw error('Invalid Information', 400)
    }
  }

  async function upsert({id, data}){
    const authData = {
      id
    }
    if(data.username){
      authData.username = data.username
    }
    if(data.password){
      authData.password = await bcrypt.hash(data.password, 5)
    }
    return store.upsert(TABLE, authData)
  }

  return {
    upsert,
    login
  }

}