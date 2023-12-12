const userModel = require('../models/patient')

const getCurrentMonthPatients = async (req, res) => {
    try {
        const { page,limit } = req.query

        const currentMonthPatients = await userModel.getCurrentMonthPatients(page, limit)
        console.log(currentMonthPatients)
       
        res.status(200).send( { success: true, message: 'The current month patients listed below', data: currentMonthPatients})
    } catch (err) {
        console.log('Error fetching data:', err.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}
module.exports = {
    getCurrentMonthPatients
}
