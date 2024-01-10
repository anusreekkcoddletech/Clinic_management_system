const { makeDb } = require('../databaseConnect')


async function updatePatientsAppointmentStatus(status2, patientsId, date, time) {
    const db = makeDb()
    try {
            const qr = `update appointments set status2=? where patients_id=? and date=? and time=? `
            const values = [status2, patientsId, date, time]
            const updateAppointmentStatus = await db.query(qr, values)
            return updateAppointmentStatus
    } catch (err) {
        console.log('Error updating status of patients:', err.message)
        return false
    } finally {
        await db.close()
    }
}

async function addPatientsPrescription(appointmentId, diagnosys, medicineId, PrescribedQuantity) {
    const db = makeDb()
    try {
        const qr = 'insert into prescriptions (appointment_id,diagnosys) values (?,?) '
        const values = [appointmentId, diagnosys, PrescribedQuantity]
        await db.query(qr, values)

        for (i = 0; i < medicineId.length; i++) {
            const qr1 = 'insert into medicine (appointment_id,medicine_id,Prescribed_quantity) values (?,?,?)'
            const values1 = [appointmentId, medicineId[i], PrescribedQuantity[i]]

            await db.query(qr1, values1)
        }
    } catch (err) {
        console.error('Error:', err.message)
        return false
    }
    finally {
        await db.close()
    }
}

async function checkMedicineValidity(medicineId) {
    const db = makeDb()
    try {
        for (i = 0; i < medicineId.length; i++) {
            const qr = 'SELECT id FROM pharmacy WHERE id = ?'

            const result = await db.query(qr, medicineId[i])
            return result.length > 0
        }
    } catch (err) {
        console.error('Error checking medicine validity:', err.message)
        return false
    } finally {
        await db.close()
    }
}

async function searchMedicines(search) {
    const db = makeDb()
    try {
        const qr = `select id, name, price from pharmacy where name like ? `
        const values = [`%${search}%`]
        const getMedicines = await db.query(qr, values)
        return getMedicines

    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
        return false
    } finally {
        await db.close()
    }
}


async function setAppointmentLimit(employeesId, limit) {
    const db = makeDb()
    try {
        const qr = 'INSERT INTO appointment_limits ( employees_id, appointment_limit) VALUES ( ?, ?)'
        const values = [employeesId, limit]
        const result = await db.query(qr, values)
        return result
    } catch (err) {
        console.error('Error inserting data :', err.message)
        return false
    } finally {
        await db.close()
    }
}


async function checkAppointmentLimitAdded(employeesId) {
    const db = makeDb()
    try {
        const qr = `select id from appointment_limits where employees_id=? `
        const values = [employeesId]
        const checkLimit = await db.query(qr, values)
        return checkLimit
    } catch (err) {
        console.log('Error fetching appointment details:', err.message)
        return false

    } finally {
        await db.close()
    }
}

async function updateAppointmentLimit(employeesId, limit) {
    const db = makeDb()
    try {
        const qr = 'UPDATE appointment_limits SET appointment_limit=? where employees_id=?'
        const values = [limit, employeesId]
        const result = await db.query(qr, values)
        return result
    } catch (err) {
        console.error('Error inserting data :', err.message)
        return false
    } finally {
        await db.close()
    }
}



module.exports = {
    updatePatientsAppointmentStatus,
    addPatientsPrescription,
    checkMedicineValidity,
    searchMedicines,
    setAppointmentLimit,
    checkAppointmentLimitAdded,
    updateAppointmentLimit,
}
