const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const accounts = { "#54": {name: "someone", email: "someone@gmail.com"}};

// Returns all accounts
app.get('/', (req, res) => {

    // Returns a status code 200 and all accounts that exist in accounts object
    res.status(200).send(accounts);
});

// Creates new accounts
app.post('/create_account', (req, res) => {
    // Makes use of params to add specific data 
    accounts[req.query.id] = {name: req.query.name, email: req.query.email};
    res.status(200).send(accounts);
});

// Removes accounts
app.delete('/remove_account', (req, res) => {
    // Removes item from JSON 
    delete accounts[req.query.id]
    res.status(200).send(accounts);
});

// Updates accounts
app.put('/update_account', (req, res) => {
    let accountData = {name: accounts[req.query.id].name, email: accounts[req.query.id].email};

    // Failsafe in case user updates only name or email it doesn't remove the other row
    // Makes use of ternary operator, if a value doesn't exist in query then it'll return the default value
    !req.query.name ? accountData.name = accounts[req.query.id].name : accountData.name = req.query.name;
    !req.query.email ? accountData.email = accounts[req.query.id].email : accountData.email = req.query.email;

    // Updates the JSON object
    accounts[req.query.id] = accountData;
    res.status(200).send(accounts);
});

// Listens on port 3800
server.listen(3800);