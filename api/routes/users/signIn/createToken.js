let jwt = require('jsonwebtoken');

function createToken(user) {
    try {
        let secret = 'Canhtoan111';
        let payload = { ...user };
        let token = jwt.sign(payload, secret, { algorithm: 'HS256' }, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { createToken };