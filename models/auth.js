
const { makeDb } = require('../databaseConnect')

async function registerUser(name, username, password, age, gender, phone, bloodGroup) {
  const db = makeDb()
  try {
    const qr = 'insert into patients (name, username, password, age, gender, phone, bloodgroup) values (?, ?, ?, ?, ?, ?, ?)'
    const values = [name, username, password, age, gender, phone, bloodGroup]
    await db.query(qr, values)
  } catch (err) {
    console.error('Error:', err.message)
    return false
  }
  finally {
    await db.close()
  }
}

async function checkRegisteredUser(username) {
  const db = makeDb()
  try {
    const qr = 'select * from patients where username =?'
    const values = [username]
    const registeredUser = await db.query(qr, values)
    return registeredUser
  } catch (err) {
    console.error('Error checking existing user:', err.message)
    return false
  } finally {
    await db.close()
  }
}
async function loginUser(username, password) {
  const db = makeDb()
  try {
    const qr = 'select * from patients where username=? and password=?'
    const values = [username, password]
    const login = await db.query(qr, values)
    return login
  } catch (err) {
    console.error('Error:', err.message)
    return false
  } finally {
    await db.close()
  }
}


module.exports = {
  registerUser,
  checkRegisteredUser,
  loginUser,
}