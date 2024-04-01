const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Returns greeting when navigating to '/greeting' route
app.get('/greeting', (req, res) => {

    // Returns a status code 200 and message
    res.status(200).send("hello);
});

// Listens on port 3800
server.listen(3800);
