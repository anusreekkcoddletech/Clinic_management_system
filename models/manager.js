const { makeDb } = require('../databaseConnect')


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

async function checkWorkscheduleAdded(timeFrom, timeTo, employeesId) {
    const db = makeDb()
    try {
        const qr = `select id from workschedules where time_from=? AND time_to=? AND employees_id=?`

        const values = [timeFrom, timeTo, employeesId]
        const checkWorkschedule = await db.query(qr, values)
        return checkWorkschedule.length > 0

    } catch (err) {
        console.log('Error fetching work details:', err.message)

    } finally {
        await db.close()
    }
}


module.exports = {

    addEmployeesWorkschedule,
    checkEmployeesDepartment,
    checkWorkscheduleAdded
}













