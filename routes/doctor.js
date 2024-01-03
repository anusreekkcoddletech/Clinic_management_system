const express = require('express')
const doctorController = require('../controllers/doctor')
const router = express.Router()
const jwt=require('../middleware/middleware')


router.post('/updateAppointmentStatus',jwt.verifyToken, doctorController.updatePatientsAppointmentsStatus)

router.post('/addPrescription',jwt.verifyToken, doctorController.addPrescriptionDetails)

router.get('/listMedicines',jwt.verifyToken, doctorController.getMedicinesList)

router.post('/setAppointmentLimit',jwt.verifyToken, doctorController.addAppointmentLimit)

module.exports = router
