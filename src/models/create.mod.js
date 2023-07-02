const con = require('../database/db');

const createUser = async(fullname, email, password)=>{
    const query = 'INSERT INTO users (fullname, email, password) VALUES (?,?,?);';
    try {
         await con(query, [fullname, email, password]);
    } catch (err) {
        console.log('There was an error adding a user', err);
        res.status(500).send('There was and error adding a user', err)
    }
}

module.exports = {
    createUser
}