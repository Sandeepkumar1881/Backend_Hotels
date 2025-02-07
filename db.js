const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to mongoDB')
});

db.on('error', (err) => {
    console.log('error connecting to mongoDB :', err)
});

db.on('disconnected', () => { 
    console.log('disconnected from mongoDB')
});

module.exports = db;