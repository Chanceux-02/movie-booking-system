require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// require('./src/database/db')
const routes = require('./src/routes/createRoutes')
app.use('/api', routes);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log('The app is running in port', port);
});