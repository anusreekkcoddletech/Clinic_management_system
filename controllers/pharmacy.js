const userModel = require('../models/pharmacy')

const getPatientsMedicinesList = async (req, res) => {
    try {
        const patientsPurchasedMedicines = await userModel.getPatientsMedicinesDetails()
        res.status(200).send({ success: true, message: 'Data fetched successfully', data: patientsPurchasedMedicines })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const getLowStockMedicinesList = async (req, res) => {
    try {
        console.log('medicinelist Request Body:', req.body)
        const { stock } = req.body

        if (stock == null) {
            console.error('Invalid stock limit value')
            return res.status(409).send({ error: 'Invalid stock limit value' })
        } 
            const getLowestStockMedicine = await userModel.getLowestStockMedicine(stock)
            console.log(getLowestStockMedicine)
            if (getLowestStockMedicine.length<=0) {
                console.error('There is no given stock limit medicine ');
                return res.status(500).send({ error: 'There is no given stock limit medicine ' })
            }
            else {
            res.status(200).send({ success: true, message: 'Data fetched successfully', data: getLowestStockMedicine })
        }
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
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
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}

const addMedicineToPharmacy = async function (req, res) {

    try {
        console.log('Medicine adding Request Body:', req.body)
        const { name, stock, price, production_date, dosage, expiry_date, manufacturer } = req.body

        if (name == null || stock == null || price == null || production_date == null || dosage == null || expiry_date == null || manufacturer == null) {
            console.error('Some fields are empty or invalid value')
            return res.status(409).send({ error: 'Some fields are empty or invalid value' })
        }
        else {
            await userModel.addMedicine(name, stock, price, production_date, dosage, expiry_date, manufacturer)
            return res.status(200).send({ success: true, message: 'Added data successfully', data: req.body })
        }
    } catch (err) {
        console.error('Error inserting data:', err.message)
        return res.status(500).send({ error: 'Failed to insert data' })
    }
}
  

module.exports={
    getPatientsMedicinesList,
    getLowStockMedicinesList,
    selectedMonthExpiringMedicines,
    addMedicineToPharmacy
}