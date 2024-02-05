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
let deleteUserId = async (userId) => {
    try {
        let users = await query(`DELETE FROM user WHERE userId = ${userId}`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteUserId };