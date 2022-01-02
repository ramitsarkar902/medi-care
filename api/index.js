const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoute = require('./routes/auth');

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log('Mongodb connected');
  },
);

const API_URL = '/api/'; //for the api url call

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use(`${API_URL}auth`, authRoute);

app.listen(`${process.env.PORT}`, () => {
  console.log('Server Running');
});
