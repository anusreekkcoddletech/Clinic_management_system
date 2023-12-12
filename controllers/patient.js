const userModel = require('../models/patient')

const getCurrentMonthPatients = async (req, res) => {
    try {
        const { page, limit } = req.query

        const currentMonthPatients = await userModel.getCurrentMonthPatients(page, limit)
        console.log(currentMonthPatients)
        if (!page || !limit) {
            return res.status(400).send({ success: false, message: 'please check page or limit values' })
        }
        res.status(200).send({ success: true, message: 'The current month patients listed below', data: currentMonthPatients })

    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}


const getSelectedMonthPatients = async (req, res) => {
    try {
        const { month, year } = req.query
        const selectedMonthPatients = await userModel.getSelectedMonthPatients(month, year)
        console.log(selectedMonthPatients)

        res.status(200).send({ success: true, message: 'Patients listed below', data: selectedMonthPatients })
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}
module.exports = {
    getCurrentMonthPatients,
    getSelectedMonthPatients
}


