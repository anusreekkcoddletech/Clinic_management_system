const userModel = require('../models/patient')


const getSelectedMonthPatients = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatients = await userModel.getSelectedMonthPatients(month, year)

        if (!selectedMonthPatients) {
            return res.status(409).send({ success: false, message: 'Error fetching data' })

        } else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthPatients })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const getSelectedMonthPatientsappointments = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatientsappointments = await userModel.getSelectedPatientsAppointments(month, year)
        if (!selectedMonthPatientsappointments) {
            return res.status(409).send({ success: false, message: 'Error fetching data' })
        }
        else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthPatientsappointments })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getPatientsAppointmentsList = async (req, res) => {
    try {
        const patientsappointmentbyDate = await userModel.getPatientsAppointments()
        if (!patientsappointmentbyDate) {
            return res.status(409).send({ success: false, message: 'Error fetching data' })

        } else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientsappointmentbyDate })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const bookAppointmentsList = async function (req, res) {
    try {
        console.log('appointment Request Body:', req.body)
        const { patientsId, employeesId, date, time } = req.body

        if (!patientsId || !employeesId || !date || !time) {
            console.error('Some fields are empty')
            return res.status(409).send({ success: false, message: 'All fields are required' })
        }

        const checkAppointmentBooked = await userModel.checkAppointmentBooked(time, date)

        if (checkAppointmentBooked.length > 0) {
            console.error('This time range already booked!')
            return res.status(409).send({ success: false, message: 'This time range already booked!' })
        } else{
        const limitValue = await userModel.getAppointmentLimit(employeesId)
        if (limitValue !== null) {

            const bookedAppointments = await userModel.checkNumberOfAppointments(date, employeesId)
            if (bookedAppointments >= limitValue) {

                console.error('Maximum number of appointment booked for this date!')
                return res.status(409).send({ success: false, message: 'Maximum number of appointment booked for this date!' })
            }
        } 
        const booked = await userModel.bookAppointmentsList(patientsId, employeesId, date, time)
        if (booked===false) {
            return res.status(409).send({ success: false, message: 'Error executing appointment query:' })
        } else {

            return res.status(200).send({ success: true, message: 'Requested successfully', data: req.body })
        } 
    }
    } catch (err) {
        console.error('Error executing appointment query:', err.message)
         res.status(200).send({ success: false, message: 'Booking failed' })
    }
}
const getPatientProfileData = async (req, res) => {
    try {
        console.log('Data Request Body:', req.body)
        const { username } = req.body

        if (username == null) {
            console.error('Invalid username')
            return res.status(409).send({ success: false, message: 'Invalid username' })
        }
        const patientProfileData = await userModel.viewProfile(username)
        if (!patientProfileData) {
            return res.status(409).send({ success: false, message: 'Error fetching data' })

        } else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientProfileData })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })

    }
}

module.exports = {
    getSelectedMonthPatientsappointments,
    getSelectedMonthPatients,
    bookAppointmentsList,
    getPatientsAppointmentsList,
    getPatientProfileData
}



