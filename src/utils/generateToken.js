require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
const jwtConfig = { algorithm: 'HS256' };

module.exports = (payload) => jwt.sign(payload, secret, jwtConfig);
