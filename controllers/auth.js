
const userModel = require('../models/auth')
const jwt = require('jsonwebtoken')

const register = async function (req, res) {
  try {
    console.log('Registration Request Body:', req.body)

    const { name, username, password, age, gender, phone, bloodGroup, userType } = req.body
    const userInfo = { name, username, password, age, gender, phone, bloodGroup, userType }

    if (!name || !username || !password || !age || !gender || !phone || !bloodGroup || !userType) {
      console.error('Some fields are empty')
      return res.status(409).send({ success: false, message: 'All fields are required' })

    }
    const checkExistingUser = await userModel.checkRegisteredUser(username)
    console.log(checkExistingUser)
    if (checkExistingUser.length > 0 || !checkExistingUser) {
      console.error('User is already registered')
      res.status(409).send({ success: false, message: 'User is already registered' })

    } else {
      const registerUser = await userModel.registerUser(userInfo)
      if (registerUser) {
        return res.status(409).send({ success: false, message: 'registration failed ' })

      } else {
        res.status(200).send({ success: true, message: 'registration completed' })
      }
    }
  } catch (err) {
    console.error('Error executing registration query:', err.message)
    res.status(409).send({ success: false, message: 'registration failed' })
  }
}

const employeeRegister = async function (req, res) {
  try {
    console.log('Registration Request Body:', req.body)
    const { name, qualification, experience, gender, phone, hiringDate, employeeTypesId, departmentId, username, password } = req.body
    if (!name || !qualification || !experience || !gender || !phone || !hiringDate || !employeeTypesId || !departmentId  || !username || !password) {
      console.error('Some fields are empty')
      return res.status(409).send({ success: false, message: 'All fields are required' })
    }
    const checkExistingEmployee = await userModel.checkRegisteredEmployee(username)
    if (checkExistingEmployee.length > 0 || checkExistingEmployee===false) {
      console.error('Employee is already registered')
      res.status(409).send({ success: false, message: 'Employee is already registered' })
    }
    else {
      const regEmployee = await userModel.registerEmployee(name, qualification, experience, gender, phone, hiringDate,parseInt(employeeTypesId),parseInt(departmentId), username, password)
      if (regEmployee) {
        res.status(200).send({ success: true, message: 'registration completed' })
      } else {
        console.error('Registration error');
        res.status(409).send({ success: false, message: 'registration failed' });
      }
    }
  } catch (err) {
    console.error('Error executing registration query:', err.message)
    res.status(409).send({ success: false, message: 'registration failed' })
  }
}

const login = async function (req, res) {
  try {
    console.log('Login Request Body:', req.body)
    const { username, password, userTypes } = req.body
    if (!username || !password || !userTypes) {
      console.error('Some fields are empty')
      return res.status(409).send({ success: false, message: 'Some fields are empty' })
    }
    const result = await userModel.loginUser(username, password, userTypes)
    if (result.length > 0) {
      const resp = {
        username: result[0].username,
        password: result[0].password,
        userTypes: result[0].userTypes
      }
      if (result === false) {
        return res.status(409).send({ success: false, message: 'Login error' })

      } else {
        const token = jwt.sign(resp, "secret", { expiresIn: 86400 })
        res.status(200).send({ auth: true, token: token, userTypes })
      }
    } else {
      return res.status(409).send({ success: false, message: 'invalid credentials' })
    }
  } catch (err) {
    console.error('Error executing query:', err.message)
    return res.status(500).send({ success: false, message: 'Error executing query' })
  }
}


module.exports = {
  register,
  login,
  employeeRegister

}

