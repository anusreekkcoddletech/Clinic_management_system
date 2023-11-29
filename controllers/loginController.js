const db = require('../models/database')

function login(req,res) {
    const username = req.body.username
    const password = req.body.password

    const qr = 'select * from patients where username=? and password=?'
    const values = [username, password]
    db.query(qr, values, function (err,result) {
        if (err) {
            console.error('Error executing query:',err.message)
            res.send({ error:'invalid credentials'})
        } else {
            if (result.length > 0) {
                console.log('login successful')
                res.send({ success:'login successful'})
            } else {
                res.send({ error:'invalid credentials'})
            }
        }
    })
}
module.exports = {
    login
}


