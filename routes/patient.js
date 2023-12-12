const express = require('express')
const patientController = require('../controllers/patient')
const router = express.Router()
const jwt=require('../middleware/middleware')

router.get('/current-month-patients',jwt.verifyToken, patientController.getCurrentMonthPatients)
module.exports = router






