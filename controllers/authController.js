const userModel = require('../models/database')

const register = function (req, res) {
  console.log('Registration Request Body:', req.body)
  const { name, username, password, age, gender, phone, bloodgroup } = req.body
  userModel.registerUser(name, username, password, age, gender, phone, bloodgroup, (err) => {
    if (err) {
      console.error('Error executing registration query:', err.message)
      res.send({error: 'registration failed'})
    } else {
      res.send({success:'registration completed'})
    }
  })
}
const login = function (req, res){
  console.log('Login Request Body:', req.body)
  const { username, password } = req.body

  userModel.loginUser(username, password, function(err,result) {
    if (err) {
      console.error('Error executing login query:',err.message)
      res.send({ error: 'invalid credentials'})
    } else {
      if (result.length > 0) {
        console.log('login successful')
        res.send({ success: 'login successful'})
      } else {
        res.send({ error: 'invalid credentials'})
      }
    }
  })
}
module.exports = {
    register,
    login,
}
