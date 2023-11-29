const db = require('../models/database')

function register(req, res) {
    console.log('Request Body:', req.body)
    const name = req.body.name
    const username = req.body.username
    const password = req.body.password
    const age = req.body.age
    const gender = req.body.gender
    const phone = req.body.phone
    const bloodgroup = req.body.blood_group

    const qr = 'insert into patients(name, username, password, age, gender, phone, bloodgroup )values(?, ?, ?, ?, ?, ?, ?)'
    const values = [name, username, password, age, gender, phone, bloodgroup]
    db.query(qr, values, (err) => {
        if (err) {
            console.error('Error executing query:',err.message)
            res.send({ error:'operation failed'})
        } else {
            res.send({ success:'operation completed'})
        }
    })
}
module.exports = {
    register
}
