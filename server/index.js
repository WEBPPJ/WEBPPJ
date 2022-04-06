require('dotenv').config()
require('./database')
const express = require('express')
const app = express()
const User = require('./models/User')

app.use(express.json())
app.use('/users', async (req, res) => {
    const users = await User.find().lean()
    res.json(users)
})
app.listen(3001, () => {
    console.log('Servidor levantado en puerto 3001')
})