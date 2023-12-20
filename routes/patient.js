const express = require('express')
const patientController = require('../controllers/patient')
const router = express.Router()
const jwt=require('../middleware/middleware')

router.get('/currentMonthPatients',jwt.verifyToken, patientController.getCurrentMonthPatients)

router.get('/selectedMonthPatients',jwt.verifyToken, patientController.getSelectedMonthPatients)

router.get('/selectedDayPatients',jwt.verifyToken, patientController.getPatientsbyDate)

router.get('/currentMonthPatientsAppointments',jwt.verifyToken, patientController.getCurrentMonthPatientsappointments)

router.get('/selectedMonthPatientsAppointments',jwt.verifyToken, patientController.getSelectedMonthPatientsappointments)

router.get('/selectedDayPatientsAppointments',jwt.verifyToken, patientController.getPatientsAppointmentbyDate)

router.post('/bookAppointments',jwt.verifyToken, patientController.bookAppointmentsList)

router.get('/viewAppointments',jwt.verifyToken, patientController.getPatientsAppointmentsList)

router.post('/updateAppointmentStatus',jwt.verifyToken, patientController.updatePatientsAppointmentsStatus)



module.exports = router






