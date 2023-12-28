const userModel = require('../models/doctor')

const updatePatientsAppointmentsStatus = async function (req, res) {
    try {
        console.log('appointment status Request Body:', req.body)
        const { status2, patients_id, date } = req.body

        if (date === null || status2 === null || patients_id === null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        else {
            await userModel.updatePatientsAppointmentStatus(status2, patients_id, date)
            res.status(200).send({ success: true, message: 'Updated status successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const addPrescriptionDetails = async function (req, res) {
    try {
        console.log('Prescription adding Request Body:', req.body)
        const { appointment_id, Diagnosys, medicine_id, Prescribed_quantity } = req.body

        if (appointment_id == null || Diagnosys == null || medicine_id == null || Prescribed_quantity == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        const medicineValidCheck = await userModel.checkMedicineValidity(medicine_id)

        if (!medicineValidCheck) {
            console.error('Invalid medicine_id provided');
            return res.status(500).send({ error: 'Invalid medicine_id provided' })
        }
        else {
            await userModel.addPatientsPrescription(appointment_id, Diagnosys, medicine_id, Prescribed_quantity)
            res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getMedicinesList = async (req, res) => {
    try {
        const { search } = req.query
        const medicineList = await userModel.searchMedicines(search)
        console.log(medicineList)
        res.status(200).send({ success: true, message: 'Data fetched successfully', data: medicineList })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

module.exports={
    updatePatientsAppointmentsStatus,
    addPrescriptionDetails,
    getMedicinesList
}
