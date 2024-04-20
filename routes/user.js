const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utilities/web_token_handler');

router.get('/get_account', verifyToken, async (req, res) => {
    try {
        res.status(200).json({ message: 'Account data successfully returned.'});
    }
    catch (err) {
        res.status(400).json({ message: 'Unable to return account data.' });
    }
});

// Exports the routes as a package.
module.exports = router;