const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userAccountExist = async ({emailAddress}) => { 
    try {
        const user = await prisma.users.count({
            where: {
                email_address:  emailAddress
            }
        });
    
        return user;
    }
    catch (err) {
        console.log(`[!!] Error:\n${err}`)
        return;
    }
};

const createAccount = async ({id, emailAddress, firstName, lastName, password}) => { 
    try {
        const user = await prisma.users.create({
            data: {
                id: id,
                email_address: emailAddress,
                first_name: firstName,
                last_name: lastName,
                password: password
            }
            
        });

        return user;
    }
    catch (err) {
        console.log(`[!!] Error:\n${err}`)
        return;
    }
};

const getUserHash = async ({ emailAddress }) => { 
    try {
        const hash = await prisma.users.findFirst({
            where: {
                email_address: emailAddress,
            },
            select: {
                password: true
            }
        });

        return hash.password;
    }
    catch (err) {
        console.log(`[!!] Error:\n${err}`)
        return;
    }
};

const getAccountId = async ({ emailAddress }) => { 
    try {
        const account = await prisma.users.findFirst({
            where: {
                email_address: emailAddress,
            },
            select: {
                id: true
            }
        });

        return account.id;
    }
    catch (err) {
        console.log(`[!!] Error:\n${err}`)
        return;
    }
};

module.exports = {
    userAccountExist: userAccountExist,
    createAccount: createAccount,
    getUserHash: getUserHash,
    getAccountId: getAccountId
}