const { makeDb } = require('../databaseConnect')

async function getCurrentMonthPatients(page, limit) {
    const db = makeDb()
    try {
        const offset = (page - 1) * limit
        const qr = `SELECT * FROM patients WHERE MONTH(created) = MONTH(CURRENT_DATE()) 
        AND YEAR(created) = YEAR(CURRENT_DATE()) LIMIT ${offset}, ${limit}`

        const currentMonthPatients = await db.query(qr)
        return currentMonthPatients
    } catch (err) {
        console.log('Error fetching current month patients:', err.message)
    } finally {
        await db.close()
    }
}


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



async function getPatientsbyDate(yesterday, today, tomorrow) {
    const db = makeDb()
    try {
        if (yesterday && today) {
            const qr = `SELECT * FROM patients WHERE  DATE(created) IN (CURRENT_DATE(),DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) )ORDER BY created`
            const patientsbyDate = await db.query(qr)
            return patientsbyDate
        }
        else if (yesterday && !today) {
            const qr1 = `SELECT * FROM patients WHERE DATE(created) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) ORDER BY date`
            const patientsbyDate = await db.query(qr1)
            return patientsbyDate
        }
        else if (!yesterday && today) {
            const qr3 = `SELECT * FROM patients WHERE DATE(created) = (CURRENT_DATE()`
            const patientsbyDate = await db.query(qr3)
            return patientsbyDate
        }
        else if (!yesterday && !today) {
            const qr7 = `SELECT * FROM patients ORDER BY date`
            const selectedPatients = await db.query(qr7)
            return selectedPatients
        }

    } catch (err) {
        console.log('Error fetching patients by date:', err.message)
    } finally {
        await db.close()
    }
}

async function getCurrentMonthPatientsappointments(page, limit) {
    const db = makeDb()
    try {
        const offset = (page - 1) * limit
        const qr = `SELECT * FROM appointments WHERE MONTH(date) = MONTH(CURRENT_DATE()) 
        AND YEAR(date) = YEAR(CURRENT_DATE()) AND status="booked_appointment" LIMIT ${offset}, ${limit}`

        const currentMonthPatientsappointements = await db.query(qr)
        return currentMonthPatientsappointements
    } catch (err) {
        console.log('Error fetching current month patients:', err.message)
    } finally {
        await db.close()
    }
}

async function getSelectedMonthPatientsappointments(month, year) {
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
        console.log('Error fetching current month patients:', err.message)
    } finally {
        await db.close()
    }
}

async function getPatientsappointmentbyDate(yesterday, today, tomorrow) {
    const db = makeDb()
    try {
        if (yesterday && today && tomorrow) {
            const qr = `SELECT * FROM appointments WHERE  DATE(date) IN (CURRENT_DATE(), DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY),DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) ) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr)
            return patientsappointmentbyDate
        }
        else if (yesterday && !today && tomorrow) {
            const qr1 = `SELECT * FROM appointments WHERE DATE(date) IN ( DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY),DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr1)
            return patientsappointmentbyDate
        }
        else if (yesterday && today && !tomorrow) {
            const qr2 = `SELECT * FROM appointments WHERE DATE(date) IN (CURRENT_DATE(),DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY)) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr2)
            return patientsappointmentbyDate
        }
        else if (!yesterday && today && tomorrow) {
            const qr3 = `SELECT * FROM appointments WHERE DATE(date) IN (CURRENT_DATE(), DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY)) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr3)
            return patientsappointmentbyDate
        }
        else if (yesterday && !today && !tomorrow) {
            const qr4 = `SELECT * FROM appointments WHERE DATE(date) =DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr4)
            return patientsappointmentbyDate
        }
        else if (!yesterday && today && !tomorrow) {
            const qr5 = `SELECT * FROM appointments WHERE DATE(date) =  CURRENT_DATE() AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr5)
            return patientsappointmentbyDate
        }
        else if (!yesterday && !today && tomorrow) {
            const qr6 = `SELECT * FROM appointments WHERE DATE(date) = DATE_ADD(CURRENT_DATE(), INTERVAL 1 DAY) AND status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr6)
            return patientsappointmentbyDate
        }
        else if (!yesterday && !today && !tomorrow) {
            const qr7 = `SELECT * FROM appointments where status="booked_appointment" ORDER BY date`
            const patientsappointmentbyDate = await db.query(qr7)
            return patientsappointmentbyDate
        }

    } catch (err) {
        console.log('Error fetching patients by date:', err.message)
    } finally {
        await db.close()
    }
}


async function bookAppointmentsList(date, status, patients_id, employees_id) {
    const db = makeDb()
    try {
      const qr = 'insert into appointments (date, status, patients_id, employees_id) values (?, ?, ?, ?)'
      const values = [date, status, patients_id, employees_id]
      await db.query(qr, values)
    } catch (err) {
      console.error('Error:', err.message)
    }
    finally {
      await db.close()
    }
  }

module.exports = {
    getCurrentMonthPatients,
    getSelectedMonthPatients,
    getPatientsbyDate,
    getCurrentMonthPatientsappointments,
    getSelectedMonthPatientsappointments,
    getPatientsappointmentbyDate,
    bookAppointmentsList
}


