const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    try {
        // If no token exist then notify sender their access is denied
        const token = req.body.token;
        if (!token) return res.status(401).json({ message: 'Access denied' });

        // If the token is valid then allow the user access to the specified route
        let tokenValid = jwt.verify(token, process.env.TOKEN_SECRET);
        req.userData = tokenValid;
        next();
    }
    catch(err) {
        res.status(400).json({ message: 'Access denied, something went wrong' })
    }
}

const createToken = (id) => {
    return jwt.sign({
        id: id
    }, process.env.TOKEN_SECRET);
}

module.exports = {
    verifyToken: verify,
    createToken: createToken
}