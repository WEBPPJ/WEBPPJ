require('./database')
const express = require('express')
const app = express()
const userRouter=require('./routes/userRoutes')
app.use(express.json())
// Model
const Coaster = require('./models/model')

app.get('/api/coasters', async (req, res) => {
    
    await Coaster
        .find().lean()
        .then(allCoasters => res.json(allCoasters))
})


const User = require('./models/user')

app.use(express.json())
app.use('/users', async (req, res) => {
    //const users = await User.find().lean()
    //res.json(users)
    res.json('hola')
})

app.use("/api/users", userRouter)


app.listen(3001, () => {
    console.log('Servidor levantado en puerto 3001')
})