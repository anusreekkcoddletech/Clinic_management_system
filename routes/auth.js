const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()

router.post('/login',authController.login)
router.post('/signUp', authController.register)
router.post('/signUpForEmployee', authController.employeeRegister)

module.exports = router

