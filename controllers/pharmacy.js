const userModel = require('../models/pharmacy')

const getPatientsMedicinesList = async (req, res) => {
    try {
        const patientsPurchasedMedicines = await userModel.getPatientsMedicinesDetails()
        if (!patientsPurchasedMedicines) {
            return res.status(409).send({ success: false, message: 'error: Failed to fetch data' })
        }
        else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientsPurchasedMedicines })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const getLowStockMedicinesList = async (req, res) => {
    try {
        console.log('medicinelist Request Body:', req.body)
        const { stock } = req.body

        if (stock == null) {
            console.error('Invalid stock limit value')
            return res.status(409).send({ success: false, message: 'Invalid stock limit value' })

        }
        const getLowestStockMedicine = await userModel.getLowestStockMedicine(stock)
        if (getLowestStockMedicine.length <= 0||!getLowestStockMedicine) {
            console.error('There is no given stock limit medicine ')
            return res.status(500).send({ success: false, message: 'There is no given stock limit medicine ' })

        }
        else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: getLowestStockMedicine })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })

    }
}

const selectedMonthExpiringMedicines = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthExpiringMedicines = await userModel.getSelectedMonthExpiringMedicines(month, year)
        if (!selectedMonthExpiringMedicines) {
            return res.status(409).send({ success: false, message: 'Failed to fetch data' })
        } else {
            res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthExpiringMedicines })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to fetch data' })
    }
}

const addMedicineToPharmacy = async function (req, res) {

    try {
        console.log('Medicine adding Request Body:', req.body)
        const { name, stock, price, productionDate, dosage, expiryDate, manufacturer, code } = req.body
        const medicineInfo = {name, stock, price, productionDate, dosage, expiryDate, manufacturer, code  }


        if (name == null || stock == null || price == null || productionDate == null || dosage == null || expiryDate == null || manufacturer == null || code == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message: 'Some fields are empty or invalid value' })
        }
        const checkExistingMedicine = await userModel.checkExistingMedicine(code)
        if (checkExistingMedicine.length > 0) {
            await userModel.updateMedicineStock(stock,price,code)          
            return res.status(500).send({ success: false, message: 'Updated stock quantity' })
        }
        const addMedicine = await userModel.addMedicine(medicineInfo)
        if (checkExistingMedicine === false || updateStock === false||!addMedicine) {
            return res.status(409).send({ success: false, message: 'error: Failed to insert data' })
        } else {
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ success: false, message: 'Failed to insert data' })
    }
}

module.exports = {
    getPatientsMedicinesList,
    getLowStockMedicinesList,
    selectedMonthExpiringMedicines,
    addMedicineToPharmacy
}
