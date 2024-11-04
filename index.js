const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoute = require('./routes/user');
const productRoute = require('./routes/product');

const app = express();
app.use(express.json());

//Routes

app.use('/user', userRoute);
app.use('/product', productRoute);


const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database!");
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })
    .catch(() => {
        console.log("Connection failed!");
    })