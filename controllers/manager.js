const userModel = require('../models/manager')


const addEmployeesWorkSchedule = async function (req, res) {
    try {
        console.log('workschedule adding Request Body:', req.body)
        const { date, timeFrom, timeTo, employeesId, department } = req.body

        if (date == null || timeFrom == null || timeTo == null || employeesId == null || department == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message: 'Some fields are empty or invalid value' })
        }

        const departmentCheck = await userModel.checkEmployeesDepartment(department)
        if (departmentCheck.length < 1 ||departmentCheck=== false) {
            console.error('Invalid department provided')
            return res.status(500).send({ success: false, message: 'Invalid department provided' })
        }
        const checkWorkAdded = await userModel.checkWorkscheduleAdded(date, timeFrom, timeTo, employeesId)
        if (checkWorkAdded.length > 0) {
            console.error('Already assigned job')
            return res.status(500).send({ success: false, message: 'Already assigned job' })
        }

        const addWorkschedule = await userModel.addEmployeesWorkschedule(date, timeFrom, timeTo, employeesId)
      
        if (checkWorkAdded=== false|| addWorkschedule === false) {
            return res.status(409).send({ success: false, message: 'Failed to insert data' })
        } 
        else {
            return res.status(200).send({ success: true, message: 'Added data successfully'})
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to insert data' })
    }
}


module.exports = {
    addEmployeesWorkSchedule

}



