const express = require('express')
const pharmacyController = require('../controllers/pharmacy')
const router = express.Router()
const jwt=require('../middleware/middleware')


router.get('/listPurchasedMedicines',jwt.verifyToken, pharmacyController.getPatientsMedicinesList)

router.get('/lowStockMedicines',jwt.verifyToken, pharmacyController.getLowStockMedicinesList)

router.get('/selectedMonthExpiringMedicines',jwt.verifyToken, pharmacyController.selectedMonthExpiringMedicines)

router.post('/addMedicineToPharmacy',jwt.verifyToken, pharmacyController.addMedicineToPharmacy)


module.exports = router
