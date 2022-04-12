require('./database')
const express = require('express')
const app = express()
const userRouter=require('./routes/userRoutes')
app.use(express.json())


//configuración de CORS
const cors=require('cors')
app.use(cors())

//rutas de usuarios
app.use("/api/users", userRouter)


app.listen(3001, () => {
    console.log('Servidor levantado en puerto 3001')
})