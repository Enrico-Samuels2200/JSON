const express = require('express');
const router = express.Router();
const { createToken } = require('../utilities/web_token_handler');
const { checkForAccount, createUserAccount, verifyCredentials, getUserAccountId } = require('../controllers/authentication_controller');

router.post('/sign-up', async (req, res) => {
    try {
        // Checks if account exists or not, if it does then return error message to sender
        const accountExist = await checkForAccount(req.body.emailAddress);
        if (accountExist) return res.status(409).json({ message: 'Please ensure all credentials are correct.' });

        await createUserAccount({
            emailAddress: req.body.emailAddress,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        })

        res.status(200).json({ message: 'Account creation successful.'});
    }
    catch (err) {
        res.status(400).send('Account creation un-successful. Please ensure all credentials are correct.');
    }
});

router.post('/sign-in', async (req, res) => {
    try {
        const credentialsValid = await verifyCredentials({
            emailAddress: req.body.emailAddress,
            password: req.body.password
        });
        
        if (!credentialsValid) return res.status(401).json({ message: 'Incorrect email or password. Please try again.' });

        // Returns user account ID and passes it into a token
        let token = createToken(await getUserAccountId({ emailAddress: req.body.emailAddress }));

        res.status(200).json({ message: 'Successfully signed-in.', token: token });
    }
    catch (err) { 
        res.status(400).json({ message: 'Account sign-in un-successful. Please ensure all credentials are correct.' });
    }
});

// Exports the routes as a package.
module.exports = router;