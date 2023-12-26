const express = require('express')
const patientController = require('../controllers/patient')
const router = express.Router()
const jwt=require('../middleware/middleware')


router.get('/selectedMonthPatients',jwt.verifyToken, patientController.getSelectedMonthPatients)

router.get('/viewAppointments',jwt.verifyToken, patientController.getPatientsAppointmentsList)

router.get('/selectedMonthPatientsAppointments',jwt.verifyToken, patientController.getSelectedMonthPatientsappointments)

router.post('/bookAppointments',jwt.verifyToken, patientController.bookAppointmentsList)

router.post('/updateAppointmentStatus',jwt.verifyToken, patientController.updatePatientsAppointmentsStatus)

router.post('/addPrescription',jwt.verifyToken, patientController.addPrescriptionDetails)

router.post('/addPrescription',jwt.verifyToken, patientController.addPrescriptionDetails)

router.get('/listMedicines',jwt.verifyToken, patientController.getMedicinesList)

router.get('/listPurchasedMedicines',jwt.verifyToken, patientController.getPatientsMedicinesList)

router.get('/lowStockMedicines',jwt.verifyToken, patientController.getLowStockMedicinesList)

router.get('/selectedMonthExpiringMedicines',jwt.verifyToken, patientController.selectedMonthExpiringMedicines)



module.exports = router






