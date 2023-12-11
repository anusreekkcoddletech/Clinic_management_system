const express = require('express')
const authController = require('../controllers/auth')
const router = express.Router()
const jwt=require('../middleware/middleware')

router.post('/login',authController.login)
router.post('/signUp',jwt.verifyToken, authController.register)

router.get('/current-month-patients',jwt.verifyToken, authController.getCurrentMonthPatients)

module.exports = router

