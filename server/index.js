
require('./database')
const express = require('express')
const app = express()
app.use(express.json())
// Model
const Coaster = require('./models/model')

app.get('/api/coasters', async (req, res) => {
    
    await Coaster
        .find().lean()
        .then(allCoasters => res.json(allCoasters))
})



app.listen(3001, () => {
    console.log('Servidor levantado en puerto 3001')
})