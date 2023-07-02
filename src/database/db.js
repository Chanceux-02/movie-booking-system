const mysql = require('mysql');
require('dotenv').config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

if (!host || !user || !port || !database) {
    console.error('One or more environment variables are missing or empty.');
    process.exit();
}

const config = {
    host: host,
    user: user,
    password: password,
    port: port,
    database: database
}

//testing the database
// const connection = mysql.createConnection(config);
// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to the database!');
//   connection.end();
// });

//after this i can remove the testing code for config or connection
const db = mysql.createPool(config);
module.exports = (query, values) =>{
    return new Promise ((resolve, reject)=>{
        db.getConnection((err, sql)=>{
            if(err){
                console.log('Get connection error', err);
            }else{
                sql.query(query, values, (err, results)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(results);
                    }
                    sql.release();
                });
            }
        });
    });
}