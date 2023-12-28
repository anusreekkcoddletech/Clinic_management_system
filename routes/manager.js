const express = require('express')
const managerController = require('../controllers/manager')
const router = express.Router()
const jwt=require('../middleware/middleware')


router.post('/addEmployeesWorkschedule',jwt.verifyToken, managerController.addEmployeesWorkSchedule)

module.exports=router