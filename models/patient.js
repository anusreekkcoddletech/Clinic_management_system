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
        const qr = `SELECT a.id ,a.date,a.status2, p.name,e.name FROM appointments a INNER JOIN patients p ON a.patients_id = p.id
                    INNER JOIN employees e ON a.employees_id = e.id `
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

async function addPatientsPrescription(appointment_id, diagnosys, medicine_id) {
    const db = makeDb()
    try {
        const qr = 'insert into prescriptions (appointment_id,diagnosys) values (?,?)'
        const values = [appointment_id, diagnosys]
        await db.query(qr, values)

        for (i = 0; i < medicine_id.length; i++) {

            const qr1 = 'insert into medicine (appointment_id,medicine_id) values (?,?)'
            const values1 = [appointment_id, medicine_id[i]]

            await db.query(qr1, values1)
        }
    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
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
    addPatientsPrescription
}


