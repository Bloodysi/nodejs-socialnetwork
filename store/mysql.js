const mysql = require('mysql');
const config = require('../config');

let connection;

function handleConnection(){
  connection = mysql.createConnection(config.mysql)
  connection.connect(err=> {
    if(err){
      console.error('DB ERROR', err)
      setTimeout(()=> {
        handleConnection()
      }, 2000)
    }else console.log('DB IS CONNECTED')
  })
  connection.on('error', err=> {
    console.error('DB ERROR', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      handleConnection()
    }else throw err
  })
}

handleConnection()

function list(table){
  return new Promise((resolve, reject)=> {
    connection.query(`SELECT * FROM ${table}`, (err, data)=> {
      if(err) return reject(err)
      resolve(data)
    })
  })
}

function get(table, id) {
  return new Promise((resolve, reject)=> {
    connection.query(`SELECT * FROM ${table} WHERE id='${id}'`, (err, data) =>{
      if(err) return reject(err)
      resolve(data)
    })
  })
}

function upsert(table, data) {
  return new Promise((resolve, reject)=> {
    connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) =>{
      if(err) return reject(err)
      resolve(result)
    })
  })
}

function update(table, data) {
  return new Promise((resolve, reject)=> {
    connection.query(`UPDATE ${table} SET ? WHERE id= ?`, [data, data.id], (err, result) =>{
      if(err) return reject(err)
      resolve(result)
    })
  })
}

function query(table, query, join){
  let joinQuery = ''
  if(join){
    const key = Object.keys(join)[0]
    const val = join[key]
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id `
  }

  return new Promise((resolve, reject)=> {
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, data)=> {
      if(err) return reject(err);
      resolve(data || null)
    })
  })
}



module.exports = {
  list,
  get,
  upsert,
  update,
  query
}