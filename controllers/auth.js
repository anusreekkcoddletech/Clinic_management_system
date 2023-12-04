const userModel = require('../models/auth')

const register = function (req, res) {
  console.log('Registration Request Body:', req.body)
  const { name, username, password, age, gender, phone, bloodgroup , employees_id} = req.body
  if(!name ||!username ||!password || !age || !gender || !phone || !bloodgroup || !employees_id){
    console.error('Some fields are empty')
    res.status(400).send({error:'All fields are required'})
    return
  }
  userModel.registerUser(name, username, password, age, gender, phone, bloodgroup, employees_id, (err) => {
    if (err) {
      console.error('Error executing registration query:', err.message)
      res.status(500).send({error: 'registration failed'})
    } else {
      res.status(200).send({success:'registration completed'})
    }
  })
}
const login = function (req, res){
  console.log('Login Request Body:', req.body)
  const { username, password } = req.body
  if (!username || !password){
    console.error('Some fields are empty')
    res.status(400).send({error:'Some fields are empty'})
    return
  }
  userModel.loginUser(username, password, function(err,result) {
    if (err) {
      console.error('Error executing login query:',err.message)
      res.status(500).send({ error: 'invalid credentials'})
    } else {
      if (result.length > 0) {
        console.log('login successful')
        res.status(200).send({ success: 'login successful'})
      } else {
        res.status(401).send({ error: 'invalid credentials'})
      }
    }
  })
}
module.exports = {
    register,
    login,
}
