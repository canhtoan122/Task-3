var express = require('express');
var router = express.Router();
let User = require('../Model/User');
let { verifyToken } = require('./verifyToken');
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
let getUser = async () => {
    try {
        let users = await query('SELECT * FROM user');
        return users;
    } catch (err) {
        console.log(err);
    }
}
router.post('/', async function (req, res, next) {
    try {
        let { email, password } = req.body;
        let passwordInput = password;
        let emailInput = email;
        let tokens = [];
        let users = await getUser();
        let check = false;
        for (let i = 0; i < users.length; i++) {
            let token = users[i].token;
            let result = await verifyToken(token);
            tokens.push(result);
        }
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].password == passwordInput && tokens[i].email == emailInput) {
                check = true;
                break;
            }
        }
        res.json({ check });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
