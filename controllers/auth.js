
const userModel = require('../models/auth')
const jwt = require('jsonwebtoken')

const register = async function (req, res) {
  try {
    console.log('Registration Request Body:', req.body)
    const { name, username, password, age, gender, phone, bloodgroup, employees_id } = req.body
    if (!name || !username || !password || !age || !gender || !phone || !bloodgroup || !employees_id) {
      console.error('Some fields are empty')
      res.status(409).send({ error: 'All fields are required' })
      return
    }
    const checkExistingUser = await userModel.checkRegisteredUser(username)
    if (checkExistingUser.length > 0) {
      console.error('User is already registered')
      res.status(409).send({ error: 'User is already registered' })
    } else {
      await userModel.registerUser(name, username, password, age, gender, phone, bloodgroup, employees_id)
      res.status(200).send({ success: 'registration completed' })
    }
  } catch (err) {
    console.error('Error executing registration query:', err.message)
    res.status(500).send({ error: 'registration failed' })
  }
}

const login = async function (req, res) {
  try {
    console.log('Login Request Body:', req.body)
    const { username, password } = req.body
    if (!username || !password) {
      console.error('Some fields are empty')
      res.status(409).send({ error: 'Some fields are empty' })
      return
    }

    const result = await userModel.loginUser(username, password)
    if (result.length > 0) {
      const resp = {
        id: result[0].id,
        display_name: result[0].display_name
      }
      const token = jwt.sign(resp, "secret", { expiresIn: 86400 })
      res.status(200).send({ auth: true, token: token })
    } else {
      res.status(401).send({ error: 'invalid credentials' })
    }
  } catch (err) {
    console.error('Error executing login query:', err.message)
    res.status(500).send({ error: 'invalid credentials' })
  }
}

const getCurrentMonthPatients = async function (req, res) {
  try {
    const currentMonthPatients = await userModel.getCurrentMonthPatients()
    res.status(200).send({ patients: currentMonthPatients })
  } catch (err) {
    console.error('Error fetching data:', err.message)
    res.status(500).send({ error: 'Failed to fetch data' })
  }
}
module.exports = {
  register,
  login,
  getCurrentMonthPatients
}