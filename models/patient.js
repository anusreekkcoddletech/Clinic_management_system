const { makeDb } = require('../databaseConnect')

async function getSelectedMonthPatients(month, year) {
    const db = makeDb()
    try {
        if (!month || !year) {

            const qr = `SELECT * FROM patients WHERE MONTH(created) = MONTH(CURRENT_DATE()) 
            AND YEAR(created) = YEAR(CURRENT_DATE())`

            const currentMonthPatients = await db.query(qr)
            return currentMonthPatients
        }
        else {
            const qr1 = `SELECT * FROM patients WHERE MONTH(created) = ${month} AND  YEAR(created)  = ${year}`
            const selectedMonthPatients = await db.query(qr1)
            return selectedMonthPatients
        }
    } catch (err) {
        console.log('Error fetching current month patients:', err.message)
    } finally {
        await db.close()
    }
}

async function getPatientsAppointments() {
    const db = makeDb()
    try {
        const qr = `SELECT a.id, a.date, a.status2, p.name AS patient_name, e.name AS doctor_name FROM appointments a
                    INNER JOIN patients p ON a.patients_id = p.id INNER JOIN employees e ON a.employees_id = e.id`

        const patientsappointments = await db.query(qr)
        return patientsappointments
    } catch (err) {
        console.log('Error fetching patients details:', err.message)
    } finally {
        await db.close()
    }
}

async function getSelectedPatientsAppointments(month, year) {
    const db = makeDb()
    try {
        if (!month || !year) {

            const qr = `SELECT * FROM appointments WHERE MONTH(date) = MONTH(CURRENT_DATE()) 
            AND YEAR(date) = YEAR(CURRENT_DATE()) AND status="booked_appointment"`

            const currentMonthPatientsappointements = await db.query(qr)
            return currentMonthPatientsappointements
        }
        else {
            const qr1 = `SELECT * FROM appointments WHERE MONTH(date) = ${month} AND  YEAR(date)  = ${year} AND status="booked_appointment"`
            const selectedMonthPatientsappointments = await db.query(qr1)
            return selectedMonthPatientsappointments
        }
    } catch (err) {
        console.log('Error fetching data of patients:', err.message)
    } finally {
        await db.close()
    }
}

async function bookAppointmentsList(date, status2, patients_id, employees_id) {
    const db = makeDb()
    try {
        const qr = 'insert into appointments (date, status2, patients_id, employees_id) values (?, ?, ?, ?)'
        const values = [date, status2, patients_id, employees_id]
        await db.query(qr, values)
    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
        await db.close()
    }
}

async function checkAppointmentBooked(date, patients_id) {
    const db = makeDb()
    try {
        const qr = 'select * from appointments where date =? AND patients_id=?'
        const values = [date, patients_id]
        const appointmentBooked = await db.query(qr, values)
        return appointmentBooked
    } catch (err) {
        console.error('Already booked in this date:', err.message)
    } finally {
        await db.close()
    }
}

async function updatePatientsAppointmentStatus(status2, patients_id, date) {
    const db = makeDb()
    try {
        const qr = `update appointments set status2=? where patients_id=? and date=?`
        const values = [status2, patients_id, date]
        const updateAppointmentStatus = await db.query(qr, values)
        return updateAppointmentStatus

    } catch (err) {
        console.log('Error fetching status of patients:', err.message)
    } finally {
        await db.close()
    }
}

async function addPatientsPrescription(appointment_id, diagnosys, medicine_id,Prescribed_quantity) {
    const db = makeDb()
    try {
        const qr = 'insert into prescriptions (appointment_id,diagnosys) values (?,?)'
        const values = [appointment_id, diagnosys,Prescribed_quantity]
        await db.query(qr, values)

        for (i = 0; i < medicine_id.length; i++) {

            const qr1 = 'insert into medicine (appointment_id,medicine_id,Prescribed_quantity) values (?,?,?)'
            const values1 = [appointment_id, medicine_id[i],Prescribed_quantity]

            await db.query(qr1, values1)
        }
    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
        await db.close()
    }
}

async function checkMedicineValidity(medicine_id) {
    const db = makeDb()
    try {
        for (i = 0; i < medicine_id.length; i++) {
            const qr = 'SELECT id FROM pharmacy WHERE id = ?'

            const result = await db.query(qr, medicine_id[i])
            return result.length > 0
        }
    } catch (err) {
        console.error('Error checking medicine validity:', err.message)
    } finally {
        await db.close()
    }
}


async function searchMedicines(search) {
    const db = makeDb()
    try {
        const qr = `select id, name, price from pharmacy where name like ?`
        const values = [`${search}%`]
        console.log(qr)
        const getMedicines = await db.query(qr, values)
        return getMedicines
    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
    } finally {
        await db.close()
    }
}


async function getPatientsMedicinesDetails() {
    const db = makeDb()
    try {
        const qr = `SELECT a.id as AppointmentID, m.created as PurchaseDate, phar.name AS medicineName FROM appointments a
        INNER JOIN medicine m ON m.appointment_id = a.id INNER JOIN pharmacy phar ON m.medicine_id = phar.id`

        const PurchasedMedicines = await db.query(qr)
        return PurchasedMedicines
    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
    } finally {
        await db.close()
    }
}


async function getLowestStockMedicine() {
    const db = makeDb()
    try {
        const qr = `select name,stock from pharmacy where stock<=15`

        const lowStockMedicines = await db.query(qr)
        console.log(lowStockMedicines)
    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
    } finally {
        await db.close()
    }
}

async function getSelectedMonthExpiringMedicines(month, year) {
    const db = makeDb()
    try {
        if (!month || !year) {

            const qr = `SELECT id,name,stock,price,production_date,expiry_date , manufacturer FROM pharmacy WHERE MONTH(expiry_date) = MONTH(CURRENT_DATE()) 
            AND YEAR(expiry_date) = YEAR(CURRENT_DATE())`

            const currentMonthExpiringMedicines = await db.query(qr)
            return currentMonthExpiringMedicines
        }
        else {
            const qr1 = `SELECT id,name,stock,price,production_date,expiry_date , manufacturer FROM pharmacy WHERE MONTH(expiry_date) = ${month} AND  YEAR(expiry_date)  = ${year}`
            const selectedMonthExpiringMedicines = await db.query(qr1)
            return selectedMonthExpiringMedicines
        }
    } catch (err) {
        console.log('Error fetching data of medicines:', err.message)
    } finally {
        await db.close()
    }
}

async function addEmployeesWorkschedule(date, timeFrom, timeTo, employeesId) {
    const db = makeDb()
    try {
        const qr = 'insert into workschedules (date,time_from,time_to,employees_id) values (?,?,?,?)'
        const values = [date, timeFrom, timeTo, employeesId]
        await db.query(qr, values)

    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
        await db.close()
    }
}

async function checkEmployeesDepartment(department) {
    const db = makeDb()
    try {
        const qr = 'select name from departments where name=?'
        const result = await db.query(qr, department)
        return result.length > 0
    } catch (err) {
        console.error('Error checking department:', err.message)
    } finally {
        await db.close()
    }
}

async function checkWorkscheduleAdded( date,employeesId) {
    const db = makeDb()
    try {
        const qr = `select employees_id from workschedules where date=? AND employees_id=?`

        const values = [ date,employeesId]
        const checkWorkschedule = await db.query(qr,values)
        return checkWorkschedule.length > 0

    } catch (err) {
        console.log('Error fetching work details:', err.message)
    } finally {
        await db.close()
    }
}

async function addMedicine(name, stock, price, production_date, dosage, expiry_date, manufacturer) {
    const db = makeDb()
    try {
        const qr = 'insert into pharmacy (name, stock, price, production_date,dosage,expiry_date,manufacturer) values (?,?,?,?,?,?,?)'
        const values = [name, stock, price, production_date, dosage, expiry_date, manufacturer]
        await db.query(qr, values)

    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
        await db.close()
    }
}

async function checkLowestStockMedicine( name, manufacturer) {
    const db = makeDb()
    try {
        const qr = `select name,manufacturer from pharmacy where stock<=15 AND name=? AND manufacturer=?`

        const values = [ name, manufacturer]
        const lowStockMedicines = await db.query(qr,values)
        return lowStockMedicines.length > 0

    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
    } finally {
        await db.close()
    }
}


module.exports = {

    getSelectedMonthPatients,
    getSelectedPatientsAppointments,
    getPatientsAppointments,
    bookAppointmentsList,
    checkAppointmentBooked,
    updatePatientsAppointmentStatus,
    addPatientsPrescription,
    searchMedicines,
    checkMedicineValidity,
    getPatientsMedicinesDetails,
    getLowestStockMedicine,
    getSelectedMonthExpiringMedicines,
    addEmployeesWorkschedule,
    checkEmployeesDepartment,
    addMedicine,
    checkLowestStockMedicine,
    checkWorkscheduleAdded
}


