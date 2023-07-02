const express = require('express');
const router = express.Router();
const multer = require('multer');

const {imgformat} = require('../helpers/imgFormtter.herlper');
const upload = multer({ storage: imgformat });
const {createUserProcess, addMovieProcess} = require('../controllers/add.con');

router.post('/add-user', createUserProcess);
router.post('/add-movie', upload.single('img'), (req, res)=>{
    addMovieProcess(req, res);
    return res.status(200).send('New Movie added successfuly!')
});

module.exports = router;