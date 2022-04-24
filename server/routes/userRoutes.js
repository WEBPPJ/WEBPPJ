const express= require('express')
const router = express.Router();
const user= require('../controllers/userController')
const checkAuth=require('../middleware/checkAuth')

//creación, autenticación y confirmacion de usuarios
router.post('/',user.register)
router.post('/login', user.authenticate)
router.post('/update', user.update)
router.post('/password', user.password)
router.post('/activate', user.activate)
router.get('/all', user.all)

router.get('/profile', checkAuth, user.profile)

module.exports= router;