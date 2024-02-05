let jwt = require('jsonwebtoken');

function verifyToken(token) {
    try {
        return new Promise((resolve, reject) => {
            let secret = 'Canhtoan111';
            jwt.verify(token, secret, { algorithm: 'HS256' }, function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}
module.exports = { verifyToken };