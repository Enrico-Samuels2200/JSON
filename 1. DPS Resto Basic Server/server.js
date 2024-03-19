const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Sets up a GET request, 'http://localhost:3800/greeting'
app.get('/greeting', (req, res) => {
    // Returns a status code 200 and response of 'Hello World'
    res.status(200).send('Hello World');
});

// Listens on port 3800
server.listen(3800);