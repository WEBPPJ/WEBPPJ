const express= require('express')
const router = express.Router();
const user= require('../controllers/userController')
const checkAuth=require('../middleware/checkAuth')

//creación, autenticación y confirmacion de usuarios
router.post('/',user.register)
router.post('/login', user.authenticate)
router.get('/confirm/:token', user.confirm)

router.get('/profile', checkAuth, user.profile)

module.exports= router;