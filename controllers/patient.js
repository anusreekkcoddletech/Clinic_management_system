const userModel = require('../models/patient')
const { search } = require('../routes/patient')

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
        const selectedMonthPatientsappointments = await userModel.getSelectedPatientsAppointments(month, year)
        console.log(selectedMonthPatientsappointments)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthPatientsappointments })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
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

const bookAppointmentsList = async function (req, res) {
    try {
        console.log('appointment Request Body:', req.body)
        const { date, status2, patients_id, employees_id } = req.body

        if (!date || !status2 || !patients_id || !employees_id) {
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
            await userModel.bookAppointmentsList(date, status2, patients_id, employees_id)
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
        const { appointment_id, Diagnosys, medicine_id,Prescribed_quantity } = req.body

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
            await userModel.addPatientsPrescription(appointment_id, Diagnosys, medicine_id,Prescribed_quantity)
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
        res.status(200).send({ success: true, message: 'Medicines listed below', data: medicineList })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getPatientsMedicinesList = async (req, res) => {
    try {
        const patientsPurchasedMedicines = await userModel.getPatientsMedicinesDetails()
        res.status(200).send({ success: true, message: 'Patients listed below', data: patientsPurchasedMedicines })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getLowStockMedicinesList = async (req, res) => {
    try {
        const getLowestStockMedicine = await userModel.getLowestStockMedicine()
        res.status(200).send({ success: true, message: 'medicines listed below', data: getLowestStockMedicine })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const selectedMonthExpiringMedicines = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthExpiringMedicines = await userModel.getSelectedMonthExpiringMedicines(month, year)
        console.log(selectedMonthExpiringMedicines)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthExpiringMedicines })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

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
        const checkWorkAdded = await userModel.checkWorkscheduleAdded( date,employeesId)
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

const addMedicineToPharmacy = async function (req, res) {

    try {
        console.log('Medicine adding Request Body:', req.body)
        const { name, stock, price, production_date, dosage, expiry_date, manufacturer } = req.body

        if (name == null || stock == null || price == null || production_date == null || dosage == null || expiry_date == null || manufacturer == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        const medicineCheck = await userModel.checkLowestStockMedicine( name, manufacturer)
        if (!medicineCheck) {
            console.error('Stock checked! No need for new stock')
            return res.status(500).send({ error: 'Stock checked! No need for new stock' })
        }
        else {
            await userModel.addMedicine(name, stock, price, production_date, dosage, expiry_date, manufacturer)
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ error: 'Failed to insert data' })
    }
}

module.exports = {
    getSelectedMonthPatientsappointments,
    getSelectedMonthPatients,
    getSelectedMonthPatientsappointments,
    bookAppointmentsList,
    updatePatientsAppointmentsStatus,
    getPatientsAppointmentsList,
    addPrescriptionDetails,
    getMedicinesList,
    getPatientsMedicinesList,
    getLowStockMedicinesList,
    selectedMonthExpiringMedicines,
    addEmployeesWorkSchedule,
    addMedicineToPharmacy
}


