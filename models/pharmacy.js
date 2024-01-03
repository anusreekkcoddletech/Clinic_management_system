const { makeDb } = require('../databaseConnect')


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

async function getLowestStockMedicine(stock) {
    const db = makeDb()
    try {
        const qr = `select name,stock from pharmacy where stock<=?`

        const lowStockMedicines = await db.query(qr,stock)
        return lowStockMedicines
        
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

async function addMedicine(name, stock, price, productionDate, dosage, expiryDate, manufacturer) {
    const db = makeDb()
    try {
        const qr = 'insert into pharmacy (name, stock, price, production_date,dosage,expiry_date,manufacturer) values (?,?,?,?,?,?,?)'
        const values = [name, stock, price, productionDate, dosage, expiryDate, manufacturer]
        await db.query(qr, values)

    } catch (err) {
        console.error('Error:', err.message)
    }
    finally {
        await db.close()
    }
}

module.exports={
    getPatientsMedicinesDetails,
    getLowestStockMedicine,
    getSelectedMonthExpiringMedicines,
    addMedicine
}