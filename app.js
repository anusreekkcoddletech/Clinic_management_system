const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const registerRoute = require('./routes/registerRoute')
const loginRoute = require('./routes/loginRoute')
const PORT = 3001
const jsonParser = bodyParser.json()

app.use('/login',jsonParser,loginRoute)
app.use('/register',jsonParser,registerRoute)
app.post('/', (req, res) => {
    res.send('<h1>Welcome to the root page</h1>')
})
app.listen(PORT,function () {
    console.log(`Server running at:http://localhost:${PORT}/`)
})
