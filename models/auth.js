const mysql = require('mysql')
const {makeDb} = require('../databaseConnect')
const util = require('util')

async function registerUser(name, username, password, age, gender, phone, bloodgroup, employees_id) {
  const db = makeDb()
  try {
    const qr = 'insert into patients (name, username, password, age, gender, phone, bloodgroup,employees_id) values (?, ?, ?, ?, ?, ?, ?,?)'
    const values = [name, username, password, age, gender, phone, bloodgroup, employees_id]
    await query(db, qr, values)
  } catch (err) {
    console.error('Error:', err.message)
  }
  finally {
    await close(db)
  }
}
async function checkRegisteredUser(username) {
  const db = makeDb()
  try {
    const qr = 'select * from patients where username =?'
    const values = [username]
    const registeredUser = await query(db, qr, values)
    return registeredUser
  } catch (err) {
    console.error('Error checking existing user:', err.message)
  } finally {
    await close(db)
  }
}
async function loginUser(username, password) {
  const db = makeDb()
  try {
    const qr = 'select * from patients where username=? and password=?'
    const values = [username, password]
    const login = await query(db, qr, values)
    return login
  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await close(db)
  }
}
function query(db, qr, values) {
  return util.promisify(db.query).call(db, qr, values)
}
function close(db) {
  return util.promisify(db.end).call(db)
}
module.exports = {
  registerUser,
  checkRegisteredUser,
  loginUser,
  query,
  close
}
