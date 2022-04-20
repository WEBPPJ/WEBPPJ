const express= require('express')
const router = express.Router();
const link= require('../controllers/linkController')

//creación y obtención de enlaces
router.post('/',link.add)
router.post('/activate', link.activate)
router.get('/all', link.all)


module.exports= router;