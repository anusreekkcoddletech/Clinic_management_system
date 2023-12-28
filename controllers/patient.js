const userModel = require('../models/patient')


const getSelectedMonthPatients = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatients = await userModel.getSelectedMonthPatients(month, year)
        console.log(selectedMonthPatients)

        res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthPatients })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getSelectedMonthPatientsappointments = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatientsappointments = await userModel.getSelectedPatientsAppointments(month, year)
        console.log(selectedMonthPatientsappointments)

        res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthPatientsappointments })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getPatientsAppointmentsList = async (req, res) => {
    try {
        const patientsappointmentbyDate = await userModel.getPatientsAppointments()
        res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientsappointmentbyDate })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const bookAppointmentsList = async function (req, res) {
    try {
        console.log('appointment Request Body:', req.body)
        const {  patients_id, employees_id,date,time } = req.body

        if (!patients_id || !employees_id || !date || !time) {
            console.error('Some fields are empty')
            res.status(409).send({ error: 'All fields are required' })
            return
        }
        const checkAppointmentBooked = await userModel.checkAppointmentBooked(time,date)
        if (checkAppointmentBooked.length > 0) {
            console.error('This time range already booked!')
            res.status(409).send({ error: 'This time range already booked!' })
        }
        const checkAppointmentNumber = await userModel.checkNumberOfAppointments(date,employees_id)
        if (checkAppointmentNumber.length > 20) {
            console.error('Maximum number of appointment booked for this date!')
            res.status(409).send({ error: 'Maximum number of appointment booked for this date!' })
        }
        else {
            await userModel.bookAppointmentsList( patients_id, employees_id,date,time)
            res.status(200).send({ success: true, message: 'Requested successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error executing appointment query:', err.message)
        res.status(500).send({ error: 'Booking failed' })
    }
}


module.exports = {
    getSelectedMonthPatientsappointments,
    getSelectedMonthPatients,
    getSelectedMonthPatientsappointments,
    bookAppointmentsList,
    getPatientsAppointmentsList,
}


