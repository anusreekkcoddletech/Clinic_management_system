const userModel = require('../models/patient')

const getSelectedMonthPatients = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatients = await userModel.getSelectedMonthPatients(month, year)
        console.log(selectedMonthPatients)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthPatients })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getSelectedMonthPatientsappointments = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatientsappointments = await userModel.getPatientsAppointments(month, year)
        console.log(selectedMonthPatientsappointments)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthPatientsappointments })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const bookAppointmentsList = async function (req, res) {
    try {
        console.log('appointment Request Body:', req.body)
        const { date, status, patients_id, employees_id } = req.body

        if (!date || !status || !patients_id || !employees_id) {
            console.error('Some fields are empty')
            res.status(409).send({ error: 'All fields are required' })
            return
        }
        const checkAppointementBooked = await userModel.checkAppointmentBooked(date, patients_id)
        if (checkAppointementBooked.length > 0) {
            console.error('User is already booked in this date')
            res.status(409).send({ error: 'User is already booked in this date' })
        }
        else {
            await userModel.bookAppointmentsList(date, status, patients_id, employees_id)
            res.status(200).send({ success: true, message: 'Appointment requested', data: req.body })
        }
    } catch (err) {
        console.error('Error executing appointment query:', err.message)
        res.status(500).send({ error: 'Booking failed' })
    }
}

const updatePatientsAppointmentsStatus = async function (req, res) {
    try {
        console.log('appointment status Request Body:', req.body)
        const { status, patients_id, date } = req.body

        if (date === null || status === null || patients_id === null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        else {
            await userModel.updatePatientsAppointmentStatus(status, patients_id, date)
            res.status(200).send({ success: true, message: 'Updated status successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

module.exports = {
    getSelectedMonthPatientsappointments,
    getSelectedMonthPatients,
    getSelectedMonthPatientsappointments,
    bookAppointmentsList,
    updatePatientsAppointmentsStatus
}


