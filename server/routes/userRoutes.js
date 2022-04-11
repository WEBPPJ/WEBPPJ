const express= require('express')
const router = express.Router();
const registrar= require('../controllers/userController')

//creación, autenticación y confirmacion de usuarios
router.post('/',registrar)

module.exports= router;