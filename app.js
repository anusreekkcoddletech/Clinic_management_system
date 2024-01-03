const express = require('express')
const app = express()
const authRoute = require('./routes/auth')
const patients = require('./routes/patient')
const doctor = require('./routes/doctor')
const pharmacy = require('./routes/pharmacy')
const manager = require('./routes/manager')
const PORT = 3001
var cors = require('cors')

app.use(cors())

app.use(express.json())
app.use('/user', authRoute)
app.use('/patients', patients)
app.use('/doctor', doctor)
app.use('/pharmacy', pharmacy)
app.use('/manager', manager)


app.listen(PORT,function () {
    console.log(`Server running at:http://localhost:${PORT}/`)
})
