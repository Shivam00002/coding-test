const mongoose = require('mongoose');
require('dotenv').config();


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.URI)
        console.log('Connected to database!')
    } catch (e) {
        console.log("Databse connection error", e)
    }
}

module.exports = connectDb