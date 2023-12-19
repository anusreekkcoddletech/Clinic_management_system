const userModel = require('../models/patient')

const getCurrentMonthPatients = async (req, res) => {
    try {
        const { page, limit } = req.query

        const currentMonthPatients = await userModel.getCurrentMonthPatients(page, limit)
        console.log(currentMonthPatients)
        if (!page || !limit) {
            return res.status(400).send({ success: false, message: 'please check page or limit values' })
        }
        res.status(200).send({ success: true, message: 'The current month patients listed below', data: currentMonthPatients })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


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


const getPatientsbyDate = async (req, res) => {
    try {
        const { yesterday, today, tomorrow } = req.query
        const patientsbyDate = await userModel.getPatientsbyDate(yesterday, today, tomorrow)
        console.log(patientsbyDate)
        res.status(200).send({ success: true, message: 'Patients listed below', data: patientsbyDate })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


const getCurrentMonthPatientsappointments = async (req, res) => {
    try {
        const { page, limit } = req.query

        const currentMonthPatientsappointements = await userModel.getCurrentMonthPatientsappointments(page, limit)
        console.log(currentMonthPatientsappointements)
        if (!page || !limit) {
            return res.status(400).send({ success: false, message: 'please check page or limit values' })
        }
        res.status(200).send({ success: true, message: 'The current month patients listed below', data: currentMonthPatientsappointements })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


const getSelectedMonthPatientsappointments = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatientsappointments = await userModel.getSelectedMonthPatientsappointments(month, year)
        console.log(selectedMonthPatientsappointments)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthPatientsappointments })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


const getPatientsAppointmentbyDate = async (req, res) => {
    try {
        const { yesterday, today, tomorrow } = req.query
        const patientsappointmentbyDate = await userModel.getPatientsappointmentbyDate(yesterday, today, tomorrow)
        res.status(200).send({ success: true, message: 'Patients listed below', data: patientsappointmentbyDate })

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



const getPatientsAppointmentsList = async (req, res) => {
    try {
        const patientsappointmentbyDate = await userModel.getPatientsAppointments()
        res.status(200).send({ success: true, message: 'Patients listed below', data: patientsappointmentbyDate })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


const getPatientsAppointmentsStatus = async (req, res) => {
    try {
        const { id, status } = req.query
        if (!id || isNaN(status)) {
            console.error('Some fields are empty or invalid value')
            res.status(409).send({ error: 'Some fields are empty or invalid value' })
            return
        }
        else {
            const patientsAppointmentsStatus = await userModel.getPatientsAppointmentStatus( id,status)
            res.status(200).send({ success: true, message: 'Patients listed below', data: patientsAppointmentsStatus })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


module.exports = {
    getCurrentMonthPatients,
    getSelectedMonthPatients,
    getPatientsbyDate,
    getCurrentMonthPatientsappointments,
    getSelectedMonthPatientsappointments,
    getPatientsAppointmentbyDate,
    bookAppointmentsList,
    getPatientsAppointmentsList,
    getPatientsAppointmentsStatus
}


