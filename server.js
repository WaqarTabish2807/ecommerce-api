const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");


const app = express();

app.use(bodyParser.json());

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.use('/product', require('./routes/product'));
app.use('/variant', require('./routes/variant'));

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });

module.exports = app; // Export app for testing
