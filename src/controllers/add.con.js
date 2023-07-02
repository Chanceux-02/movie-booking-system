const createModel = require('../models/create.mod')
const bcrypt = require('bcrypt');
const {body, validationResult} = require('express-validator');

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
        await createModel.createUser(fullname, email, hashPwd);

        res.status(200).send('User added successfuly!')

    } catch (error) {
        res.status(500).send('There was an error adding a user in the process');
    }
}

const addMovieProcess = (req, res)=>{
    const body = req.body;
    const file = req.file;

    console.log(file, body)
}


module.exports = {
    createUserProcess,
    addMovieProcess
}