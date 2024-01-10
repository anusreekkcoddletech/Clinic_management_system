const userModel = require('../models/patient')


const getSelectedMonthPatients = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatients = await userModel.getSelectedMonthPatients(month, year)

        if (selectedMonthPatients == false) {
            return res.status(409).send({ success: false, message: 'error: Syntax error' })

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
        if (selectedMonthPatientsappointments == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })
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
        if (patientsappointmentbyDate == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })

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
            return res.status(409).send({ success: false, message: 'error: Syntax error' })
        } else {

            return res.status(200).send({ success: true, message: 'Requested successfully', data: req.body })
        } 
    }
    } catch (err) {
        console.error('Error executing appointment query:', err.message)
         res.status(200).send({ success: false, message: 'Booking failed' })
    }
}


module.exports = {
    getSelectedMonthPatientsappointments,
    getSelectedMonthPatients,
    getSelectedMonthPatientsappointments,
    bookAppointmentsList,
    getPatientsAppointmentsList,
}



