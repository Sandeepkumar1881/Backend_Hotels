const express = require('express');
const app = express();
require ('dotenv').config();

const db = require('./db');
const Router = require('./Router/menuroute');
const Routers = require('./Router/staffroute');
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my hotel.');
});

app.use('/', Router);
app.use('/',Routers);
//using listener for server
app.listen(process.env.PORT || 3000,()=>{
  console.log('server is running on port',process.env.PORT);
})