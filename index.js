const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

require('dotenv/config')

// Middleware
app.use(bodyParser.json({ extended: true }));

// Routes
const authRoute = require('./routes/authentication');
const userRoute = require('./routes/user');

// Middleware Routes
app.use('/auth', authRoute);
app.use('/user', userRoute);


// Listens on port 3800
server.listen(3800);