const mysql = require('mysql2')
const util = require('util')

function makeDb() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Anusreecoddle4',
        database: 'anusreekk'
    })
    con.connect(function (err) {
        if (err) {
            console.error('Error connecting to database:', err.message)
        } else {
            console.log('Connected to database')
        }
    })
    return {
        query(qr, values) {
            return util.promisify(con.query)
                .call(con, qr, values)
        },
        close() {
            return util.promisify(con.end).call(con)
        }
    }
}
module.exports = {
    makeDb
}






