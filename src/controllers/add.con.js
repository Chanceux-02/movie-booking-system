const {createUser, storeMovie} = require('../models/create.mod')
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');
const fs = require('fs');

const createUserProcess = async(req, res)=>{
    try {
        await Promise.all([
            body("fullname").notEmpty().withMessage("Name is required").run(req),
            body("email").notEmpty().exists().trim().isEmail().normalizeEmail().withMessage('Invalid Email!').run(req),
            body("password").notEmpty().exists().isLength({min: 3}).run(req)
        ]);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }

        const {fullname} = req.body;
        const {email} = req.body;
        const {password} = req.body;
        const saltRound = 10;
        const hashPwd = await bcrypt.hash(password, saltRound);
        console.log(fullname, email, hashPwd);
        await createUser(fullname, email, hashPwd);

        res.status(200).send('User added successfuly!')

    } catch (error) {
        res.status(500).send('There was an error adding a user in the process');
    }
}

const addMovieProcess = async(req, res)=>{

    try {
        await Promise.all([
            body('movieName').notEmpty().withMessage('Movie name is required!').exists().trim().escape().run(req),
            body('desc').notEmpty().withMessage('Description is required!').exists().trim().escape().run(req),
            body('schedule').notEmpty().withMessage('Schedule is required!').run(req),
            body('price').notEmpty().withMessage('Schedule is required!').run(req)
      
        ]);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('There was an error in inputs');
            return res.status(400).json({ errors: errors.array() });
        }
    
        const {movieName, desc, schedule, price} = req.body;
        const {filename, path} = req.file;
    
        console.log(movieName, filename, desc, schedule, price, filename, path)
        await storeMovie(movieName, filename, desc, schedule, price);
        const filePath = 'public/moviesPictures/' + filename;
        const fileData = fs.readFileSync(path);
    
        fs.writeFileSync(filePath, fileData);
        fs.unlinkSync(path);


    } catch (error) {
        console.log('Ther was an error adding a movie in the process', error)
        res.status(500).send('Ther was an error adding a movie in the process', error);
    }

    

}


module.exports = {
    createUserProcess,
    addMovieProcess
}