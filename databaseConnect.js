const mysql = require('mysql2')
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
    return con
}
    module.exports ={
        makeDb
    }
