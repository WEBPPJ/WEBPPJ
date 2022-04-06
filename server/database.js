const mongoose = require('mongoose')
const connectionString = "mongodb+srv://admin:kSIrpGj64bO6X6YM@webppj.pd5xy.mongodb.net/example?retryWrites=true&w=majority"
mongoose.connect(connectionString)
  .then(() => {
    console.log('Conectado con la base de datos')
  }).catch(error => {
    console.error(error)
  })