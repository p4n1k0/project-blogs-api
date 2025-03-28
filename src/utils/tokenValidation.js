require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';

module.exports = (token) => {
    try {
        const tokenRes = jwt.verify(token, secret);
        
        return tokenRes;
    } catch {
        return { type: 401 };
    }
};
