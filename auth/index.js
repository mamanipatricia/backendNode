const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: (req, owner) => {
        //
        const decoded = decodeHeader(req);
        console.log(decoded);
        // COMPROBAR SI ES O NO PROPIO

        if (decoded.id !== owner) {
            throw error('No puedes hacer esto! ', 401);
            // throw new Error('No puedes hacer esto! ');
        }
    },
    logged: (req) => {
        decodeHeader(req);
    }

}


function getToken(auth) {
    // BEARER hdjdsfkahdfkjadfkahsdlioij0ei
    console.table(auth);
    if (!auth) {
        throw new Error('No tiene token...');
    }
    if(auth.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido...');
    }

   let token = auth.replace('Bearer ', '');

   return token;
}

function decodeHeader(req) {
    // authorization == el header que queremos recibir
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);

    console.log(token);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check,
}