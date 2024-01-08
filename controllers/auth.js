
const userModel = require('../models/auth')
const jwt = require('jsonwebtoken')

const register = async function (req, res) {
  try {
    console.log('Registration Request Body:', req.body)
    const { name, username, password, age, gender, phone, bloodGroup, employeesId } = req.body
    if (!name || !username || !password || !age || !gender || !phone || !bloodGroup || !employeesId) {
      console.error('Some fields are empty')
      res.status(409).send({ success: false, message: 'All fields are required' })

      return  
    }
    const checkExistingUser = await userModel.checkRegisteredUser(username)
    if (checkExistingUser.length > 0) {
      console.error('User is already registered')
      res.status(409).send({ success: false, message: 'User is already registered' })

    } else {
      const registerUser = await userModel.registerUser(name, username, password, age, gender, phone, bloodGroup, employeesId)
      if (checkExistingUser == false || registerUser == false) {
        return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })

      } else {
        res.status(200).send({ success: true, message: 'registration completed' })
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
    const { username, password } = req.body
    if (!username || !password) {
      console.error('Some fields are empty')
      return res.status(409).send({ success: false, message: 'Some fields are empty' })
    }
    const result = await userModel.loginUser(username, password)
    if (result.length > 0) {
      const resp = {
        id: result[0].id,
        display_name: result[0].display_name
      }
      if (result == false) {
        return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })

      } else {
        const token = jwt.sign(resp, "secret", { expiresIn: 86400 })
        res.status(200).send({ auth: true, token: token })
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

}

