let express = require('express');
let router = express.Router();
let User = require('./Model/User');
let jwt = require('jsonwebtoken');

let mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let insertUser = async (user) => {
    try {
        let userData = { ...user };
        let users = await query(`INSERT INTO user (token, expired_at) 
        VALUES ('${userData.token}', '${userData.expired_at}')`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
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

router.post('/', function (req, res, next) {
    try {
        let { name, username, email, password, role } = req.body;
        let user = new User(username, name, email, password, role);
        let token = createToken(user);
        user["token"] = token;
        let decodedToken = jwt.decode(token);
        let expired_at = decodedToken && decodedToken.iat;
        user["expired_at"] = expired_at;
        insertUser(user);
        res.json(user);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
