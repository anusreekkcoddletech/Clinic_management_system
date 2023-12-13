const express = require('express')
const patientController = require('../controllers/patient')
const router = express.Router()
const jwt=require('../middleware/middleware')

router.get('/current-month-patients',jwt.verifyToken, patientController.getCurrentMonthPatients)

router.get('/selected-month-patients',jwt.verifyToken, patientController.getSelectedMonthPatients)

router.get('/selected-day-patients',jwt.verifyToken, patientController.getPatientsbyDate)

router.get('/current-month-patients-appointments',jwt.verifyToken, patientController.getCurrentMonthPatientsappointments)

router.get('/selected-month-patients-appointments',jwt.verifyToken, patientController.getSelectedMonthPatientsappointments)

router.get('/selected-day-patients-appointments',jwt.verifyToken, patientController.getPatientsappointmentbyDate)




module.exports = router





