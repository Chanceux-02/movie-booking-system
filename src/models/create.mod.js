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
const storeMovie = async(movieName, filename, description, schedule, price)=>{
    const query = 'INSERT INTO movie (movie_name, filename, description, schedule, price) VALUES (?,?,?,?,?);';
    try {
         await con(query, [movieName, filename, description, schedule, price]);
    } catch (err) {
        console.log('There was an error adding a user', err);
        res.status(500).send('There was and error adding a user', err)
    }
}

module.exports = {
    createUser,
    storeMovie
}