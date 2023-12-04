const database = require('../databaseConnect');
function registerUser(name, username, password, age, gender, phone, bloodgroup,employees_id, callback) {
  const qr = 'insert into patients (name, username, password, age, gender, phone, bloodgroup,employees_id) values (?, ?, ?, ?, ?, ?, ?,?)'
  const values = [name, username, password, age, gender, phone, bloodgroup,employees_id]
  database.query(qr, values, callback)
}
function loginUser(username, password, callback) {
  const qr = 'select * from patients where username=? and password=?'
  const values = [username, password]

  database.query(qr, values, callback)
}
module.exports = {
  registerUser,
  loginUser,
}