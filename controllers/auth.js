
const userModel = require('../models/auth')
const jwt = require('jsonwebtoken')

const register = async function (req, res) {
  try {
    console.log('Registration Request Body:', req.body)
    const { name, username, password, age, gender, phone, bloodGroup,user_type } = req.body
    if (!name || !username || !password || !age || !gender || !phone || !bloodGroup || !user_type) {
      console.error('Some fields are empty')
      res.status(409).send({ success: false, message: 'All fields are required' })

      return
    }
    const checkExistingUser = await userModel.checkRegisteredUser(username)
    if (checkExistingUser.length > 0 ||!checkExistingUser) {
      console.error('User is already registered')
      res.status(409).send({ success: false, message: 'User is already registered' })

    } else {
      const registerUser = await userModel.registerUser(name, username, password, age, gender, phone, bloodGroup, user_type)
      if ( registerUser) {
        return res.status(409).send({ success: false, message: 'error: Syntax error' })

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
    const { name, qualification, experience, gender, phone, hiring_date, employee_types_id, department_id, username, password } = req.body
    if (!name || !qualification || !experience || !gender || !phone || !hiring_date || !employee_types_id || !department_id || !username || !password) {
      console.error('Some fields are empty')
      res.status(409).send({ success: false, message: 'All fields are required' })
      return
    }
    const checkExistingEmployee = await userModel.checkRegisteredEmployee(username)
    if (checkExistingEmployee.length > 0|| !checkExistingEmployee) {
      console.error('Employee is already registered')
      res.status(409).send({ success: false, message: 'Employee is already registered' })
    }
    else {
      const regEmployee = await userModel.registerEmployee(name, qualification, experience, gender, phone, hiring_date, employee_types_id, department_id, username, password)
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
    const { username, password, employeeTypes } = req.body
    if (!username || !password || !employeeTypes) {
      console.error('Some fields are empty')
      return res.status(409).send({ success: false, message: 'Some fields are empty' })
    }
    const result = await userModel.loginUser(username, password, employeeTypes)
    if (result.length > 0) {
      const resp = {
        username: result[0].username,
        password: result[0].password,
        employeeTypes: result[0].employee_type
      }
      if (result == false) {
        return res.status(409).send({ success: false, message: 'error: Syntax error' })

      } else {
        const token = jwt.sign(resp, "secret", { expiresIn: 86400 })
        res.status(200).send({ auth: true, token: token, employeeTypes })
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

