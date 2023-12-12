const userModel = require('../models/patient')

const getCurrentMonthPatients = async (req, res) => {
    try {
        const { page } = req.query
        const parsedPage = parseInt(page, 10) || 1

        const limit = 2
        const currentMonthPatients = await userModel.getCurrentMonthPatients(parsedPage, limit)
        console.log(currentMonthPatients)

        res.status(200).send({ currentMonthPatients })
    } catch (error) {
        console.error('Error fetching data:', error.message)
        res.status(500).send({ error: 'Failed to fetch data' })
    }
}
module.exports = {
    getCurrentMonthPatients
}
