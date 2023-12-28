const userModel = require('../models/manager')


const addEmployeesWorkSchedule = async function (req, res) {
    try {
        console.log('workschedule adding Request Body:', req.body)
        const { date, timeFrom, timeTo, employeesId, department } = req.body

        if (date == null || timeFrom == null || timeTo == null || employeesId == null || department == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        const departmentCheck = await userModel.checkEmployeesDepartment(department)
        if (!departmentCheck) {
            console.error('Invalid department provided');
            return res.status(500).send({ error: 'Invalid department provided' })
        }
        const checkWorkAdded = await userModel.checkWorkscheduleAdded(timeFrom,timeTo, employeesId)
        if (checkWorkAdded) {
            console.error('Already assigned job');
            return res.status(500).send({ error: 'Already assigned job' })
        }
        else {
            await userModel.addEmployeesWorkschedule(date, timeFrom, timeTo, employeesId)
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ error: 'Failed to insert data' })
    }
}

module.exports={
    addEmployeesWorkSchedule

}