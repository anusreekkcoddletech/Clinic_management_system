const { makeDb } = require('../databaseConnect')


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
        const values = [`%${search}%`]
        console.log(qr)
        const getMedicines = await db.query(qr, values)
        return getMedicines
    } catch (err) {
        console.log('Error fetching medicine details:', err.message)
    } finally {
        await db.close()
    }
}

module.exports = {
    updatePatientsAppointmentStatus,
    addPatientsPrescription,
    checkMedicineValidity,
    searchMedicines
}
