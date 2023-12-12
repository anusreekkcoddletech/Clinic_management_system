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
            console.log(selectedMonthPatients)
            return selectedMonthPatients
        }
    } catch (err) {
        console.log('Error fetching current month patients:', err.message)
    } finally {
        await db.close()
    }
}
module.exports = {
    getCurrentMonthPatients,
    getSelectedMonthPatients
}


