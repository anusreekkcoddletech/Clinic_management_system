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
            AND YEAR(date) = YEAR(CURRENT_DATE()) AND status2=1`

            const currentMonthPatientsappointements = await db.query(qr)
            return currentMonthPatientsappointements
        }
        else {
            const qr1 = `SELECT * FROM appointments WHERE MONTH(date) = ${month} AND  YEAR(date)  = ${year} AND status2=1`
            const selectedMonthPatientsappointments = await db.query(qr1)
            return selectedMonthPatientsappointments
        }
    } catch (err) {
        console.log('Error fetching data of patients:', err.message)
    } finally {
        await db.close()
    }
}


async function checkAppointmentBooked(time,date) {
    const db = makeDb()
    try {
        const qr = 'select id from appointments where time =? AND date=?'
        const values = [time,date]
        const appointmentBooked = await db.query(qr, values)
        return appointmentBooked
    } catch (err) {
        console.error('Error:', err.message)
    } finally {
        await db.close()
    }
}


async function checkNumberOfAppointments(date,employeesId) {
    const db = makeDb()
    try {
        const qr = 'select count(id) as count from appointments where date =? AND employees_id=?'
        const values = [date,employeesId]
        const appointmentCount = await db.query(qr, values)
        return appointmentCount[0].count
    } catch (err) {
        console.error('Error:', err.message)
    } finally {
        await db.close()
    }
}



async function getAppointmentLimit( employeesId) {
    const db = makeDb()

    try {
        const qr = 'SELECT appointment_limit FROM appointment_limits WHERE employees_id = ?'
        const values = [ employeesId]
        const result = await db.query(qr, values)

        if (result.length > 0) {
            return result[0].appointment_limit
        } else {
            return null
        }
    } catch (err) {
        console.error('Error getting appointment limit:', err.message)
    } finally {
        await db.close()
    }
}


async function bookAppointmentsList( patientsId, employeesId,date,time) {
    const db = makeDb()
    try {
        const qr = 'insert into appointments ( patients_id, employees_id,date,time) values (?, ?, ?, ?)'
        const values = [ patientsId, employeesId,date,time]
        await db.query(qr, values)
        return true

    } catch (err) {
        console.error('Error:', err.message)
        return false

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
    checkNumberOfAppointments,
    getAppointmentLimit
    
}



