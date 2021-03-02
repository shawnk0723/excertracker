const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser'); not needed in newer express, it's included in express line 11

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); //this is to deal with updates to mongoDB
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
