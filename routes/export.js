const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/taskModel');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./config/db');
dotenv.config({ path: './env' });
connectDB();

const app = express();
app.use(express.json());

let BTtask = 0;
let PTtask = 0;



