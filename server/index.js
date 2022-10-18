const express = require('express')
const mongoose = require('mongoose');

const apiRoute = require('./routes/api')

mongoose.connect('mongodb://mongodb-server:27017/test').catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use("/api", apiRoute)

const PORT = process.env.PORT | 5050;

app.listen(PORT, console.log(`Listening on port ${PORT}...`))