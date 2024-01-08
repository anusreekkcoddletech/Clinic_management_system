const userModel = require('../models/doctor')

const updatePatientsAppointmentsStatus = async function (req, res) {
    try {
        console.log('appointment status Request Body:', req.body)
        const { status2, patientsId, date, time } = req.body

        if (date === null || status2 === null || patientsId === null || time === null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message: 'Some fields are empty or invalid value' })

        }
        const updateAppointmentStatus = await userModel.updatePatientsAppointmentStatus(status2, patientsId, date, time)
        if (updateAppointmentStatus == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })
        }
        else {
            res.status(200).send({ success: true, message: 'Updated status successfully', data: req.body })
        }

    } catch (err) {
        console.error('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const addPrescriptionDetails = async function (req, res) {
    try {
        console.log('Prescription adding Request Body:', req.body)
        const { appointmentId, Diagnosys, medicineId, PrescribedQuantity } = req.body

        if (appointmentId == null || Diagnosys == null || medicineId == null || PrescribedQuantity == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message: 'Some fields are empty or invalid value' })
        }
        const medicineValidCheck = await userModel.checkMedicineValidity(medicineId)

        if (!medicineValidCheck) {
            console.error('Invalid medicine_id provided');
            return res.status(500).send({ success: false, message: 'Invalid medicine_id provided' })

        }
        const addPrescription = await userModel.addPatientsPrescription(appointmentId, Diagnosys, medicineId, PrescribedQuantity)
        if (medicineValidCheck == false || addPrescription == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })
        }
        else {
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const getMedicinesList = async (req, res) => {
    try {
        const { search } = req.query
        const medicineList = await userModel.searchMedicines(search)
        if (medicineList == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })
        }
        else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: medicineList })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const addAppointmentLimit = async (req, res) => {
    try {

        console.log('Appointment Limit Adding Request Body:', req.body)
        const { employeesId, limit } = req.body

        if (employeesId == null || limit == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message: 'Some fields are empty or invalid value' })
        }
        const existingDoctor = await userModel.checkAppointmentLimitAdded(employeesId)
        if (!existingDoctor) {
            await userModel.setAppointmentLimit(employeesId, limit)
            return res.status(200).send({ success: true, message: 'Data inserted successfully', data: req.body })
        }
        const updateAppointmentLimit = await userModel.updateAppointmentLimit(employeesId, limit)
        if (existingDoctor == false || updateAppointmentLimit == false) {
            return res.status(409).send({ success: false, message: 'Database connection error: SQL syntax error' })
        }
        else {
            return res.status(200).send({ success: true, message: 'Data updated successfully', data: req.body })
        }
    } catch (err) {
        console.log('Error insert data:', err.message)
        res.status(500).send({ success: false, message: 'Failed to insert data' })

    }
}


module.exports = {
    updatePatientsAppointmentsStatus,
    addPrescriptionDetails,
    getMedicinesList,
    addAppointmentLimit
}
