const userModel = require('../models/auth')

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
      console.log('login successful')
      res.status(200).send({ success: 'login successful' })
    } else {
      res.status(401).send({ error: 'invalid credentials' })
    }
  } catch (err) {
    console.error('Error executing login query:', err.message)
    res.status(500).send({ error: 'invalid credentials' })
  }
}
module.exports = {
  register,
  login,
}

