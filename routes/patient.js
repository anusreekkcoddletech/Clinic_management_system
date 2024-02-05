const express = require('express')
const patientController = require('../controllers/patient')
const router = express.Router()
const jwt=require('../middleware/middleware')


router.get('/selectedMonthPatients',jwt.verifyToken, patientController.getSelectedMonthPatients)

router.get('/viewAppointments',jwt.verifyToken, patientController.getPatientsAppointmentsList)

router.get('/selectedMonthPatientsAppointments',jwt.verifyToken, patientController.getSelectedMonthPatientsappointments)

router.post('/bookAppointments',jwt.verifyToken, patientController.bookAppointmentsList)

router.post('/viewProfile',jwt.verifyToken, patientController.getPatientProfileData)


module.exports = router






