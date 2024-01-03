const userModel = require('../models/pharmacy')

const getPatientsMedicinesList = async (req, res) => {
    try {
        const patientsPurchasedMedicines = await userModel.getPatientsMedicinesDetails()
        return res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientsPurchasedMedicines })

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
        console.log(getLowestStockMedicine)
        if (getLowestStockMedicine.length <= 0) {
            console.error('There is no given stock limit medicine ')
            return res.status(500).send({ success: false, message: 'There is no given stock limit medicine ' })

        }
        else {
            return res.status(200).send({ success: true, message: 'Data fetched successfully', data: getLowestStockMedicine })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message:'Failed to fetch data' })

    }
}
const selectedMonthExpiringMedicines = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthExpiringMedicines = await userModel.getSelectedMonthExpiringMedicines(month, year)
        console.log(selectedMonthExpiringMedicines)

        res.status(200).send({ success: true, message: 'Data fetched successfully', data: selectedMonthExpiringMedicines })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        return res.status(500).send({ success: false, message:'Failed to fetch data' })
    }
}

const addMedicineToPharmacy = async function (req, res) {

    try {
        console.log('Medicine adding Request Body:', req.body)
        const { name, stock, price, productionDate, dosage, expiryDate, manufacturer } = req.body

        if (name == null || stock == null || price == null || productionDate == null || dosage == null || expiryDate == null || manufacturer == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ success: false, message:'Some fields are empty or invalid value'})
        }
        else {
            await userModel.addMedicine(name, stock, price, productionDate, dosage, expiryDate, manufacturer)
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ success: false, message:'Failed to insert data'})

    }
}


module.exports = {
    getPatientsMedicinesList,
    getLowStockMedicinesList,
    selectedMonthExpiringMedicines,
    addMedicineToPharmacy
}