const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const authRoute = require('./routes/authRoute')
const PORT = 3001

app.use(express.json())
app.use('/user', authRoute);
app.listen(PORT,function () {
    console.log(`Server running at:http://localhost:${PORT}/`)
})
