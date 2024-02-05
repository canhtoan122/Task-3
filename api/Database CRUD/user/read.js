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
let getAllUser = async () => {
    try {
        let users = await query(`SELECT * FROM user`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
let getUserToken = async (token) => {
    try {
        let users = await query(`SELECT * FROM user WHERE token = '${token}'`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
let getUserId = async (userId) => {
    try {
        let users = await query(`SELECT * FROM user WHERE userId = ${userId}`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllUser, getUserToken, getUserId };