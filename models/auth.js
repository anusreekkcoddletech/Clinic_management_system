
const { makeDb } = require('../databaseConnect')

async function registerUser(userInfo) {
  const db = makeDb()
  try {
    const { name, username, password, age, gender, phone, bloodGroup, userType } = userInfo
    const qr = 'insert into patients (name, username, password, age, gender, phone, bloodgroup,userType) values (?, ?, ?, ?, ?, ?, ?,?)'
    const values = [name, username, password, age, gender, phone, bloodGroup, userType]
    await db.query(qr, values)
  } catch (err) {
    console.error('Error:', err.message)
    return false
  }
  finally {
    await db.close()
  }
}

async function registerEmployee(name, qualification, experience, gender, phone, hiringDate, employeeTypesId, departmentId, username, password) {
  const db = makeDb()
  try {
    const qr = 'insert into employees (name, qualification, experience, gender, phone, hiringDate,employeeTypesId,departmentId,username,password) values (?, ?, ?, ?, ?, ?, ?,?,?,?)'
    const values = [name, qualification, experience, gender, phone, hiringDate, employeeTypesId, departmentId, username, password]
    await db.query(qr, values)
    return true
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

async function checkRegisteredEmployee(username) {
  const db = makeDb()
  try {
    const qr = 'select * from employees where username =?'
    const values = [username]
    const registeredEmployee = await db.query(qr, values)
    return registeredEmployee
  } catch (err) {
    console.error('Error checking existing employee:', err.message)
    return false
  } finally {
    await db.close()
  }
}
async function loginUser(username, password, userTypes) {
  const db = makeDb()
  try {
    if (userTypes == "patient") {
      const qr = 'select * from patients where username=? and password=? and userType=?'
      const values = [username, password, userTypes]
      const patientLogin = await db.query(qr, values)
      return patientLogin
    }
    else {
      const qr = `select e.id,e.name,e.qualification,e.gender,e.username,e_types.name as employee_type,e.password from employees e inner join employee_types e_types on e.employeeTypesId = e_types.id where username=? and password=? and e_types.name=?`
      const values = [username, password, userTypes]
      const employeeLogin = await db.query(qr, values)
      return employeeLogin
    }
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
  checkRegisteredEmployee,
  registerEmployee
}