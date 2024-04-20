const bcrypt = require('bcrypt');
const { userAccountExist, createAccount, getUserHash, getAccountId } = require('../utilities/prisma');

// generates a random string of numbers
const _generateId = () => {
    return Math.floor(Math.random() * 10000000000).toString();
};

// Encrypts plain text passwords
const _generateHashAndSalt = async (password) => {
    let salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt);
};

// Compares plain text password and hashed password
const _compareHash = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

const accountExistScanner = async (emailAddress) => {
    const accountExist = await userAccountExist({ emailAddress: emailAddress })
    return accountExist;
}

const createUserAccount = async ({ emailAddress, firstName, lastName, password}) => {
    await createAccount({
        id: _generateId(),
        emailAddress: emailAddress,
        firstName: firstName,
        lastName: lastName,
        password: await _generateHashAndSalt(password)
    })
}

const verifyCredentials = async ({ emailAddress, password }) => {
    let hash = await getUserHash({ emailAddress: emailAddress });
    let passwordValid = false;

    if (hash) {
        passwordValid = await _compareHash(password, hash);
    }

    return passwordValid;
}

const getUserAccountId = async ({ emailAddress }) => {
    return await getAccountId(emailAddress);
};

module.exports = {
    checkForAccount: accountExistScanner,
    verifyCredentials: verifyCredentials,
    createUserAccount: createUserAccount,
    getUserAccountId: getUserAccountId
};