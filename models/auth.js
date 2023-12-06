const mysql = require('mysql')
const con = require('../databaseConnect')
const util = require('util')
con.connect()

async function registerUser(name, username, password, age, gender, phone, bloodgroup, employees_id) {
  try {
    const qr = 'insert into patients (name, username, password, age, gender, phone, bloodgroup,employees_id) values (?, ?, ?, ?, ?, ?, ?,?)'
    const values = [name, username, password, age, gender, phone, bloodgroup, employees_id]
    await query(qr, values)
  } catch (err) {
    console.error('Error:', err.message)
  }
}
async function checkRegisteredUser(username){
  try{
    const qr = 'select * from patients where username =?'
    const values=[username]
    const registeredUser =await query(qr, values)
      return registeredUser
  }catch(err){
    console.error('Error checking existing user:',err.message)
  }
}
  async function loginUser(username, password) {
    try {
      const qr = 'select * from patients where username=? and password=?'
      const values = [username, password]
      const login = await query(qr, values)
      return login
    }catch (err) {
      console.error('Error:', err.message)
    }
  }
   function query(qr, values) {
    return util.promisify(con.query).call(con, qr, values)
  }
    function close() {
    return util.promisify(con.end).call(con)
  }
module.exports = {
  registerUser,
  checkRegisteredUser,
   loginUser,
   query,
   close
}


