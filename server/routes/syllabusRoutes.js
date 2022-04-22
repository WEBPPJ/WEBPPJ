const express= require('express')
const router = express.Router();
const syllabus= require('../controllers/syllabusController')

//creación y obtención de enlaces
router.post('/',syllabus.add)
router.get('/all', syllabus.all)
router.post('/update', syllabus.update)
router.post('/remove', syllabus.remove)


module.exports= router;