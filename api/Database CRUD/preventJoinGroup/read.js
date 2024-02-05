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
let getAllPreventedUser = async () => {
    try {
        let preventedUsers = await query(`SELECT * FROM preventjoingroup`);
        return preventedUsers;
    } catch (err) {
        console.log(err);
    }
}
let getPreventedUserId = async (conversationId) => {
    try {
        let preventedUsers = await query(`SELECT * FROM preventjoingroup WHERE conversationId = ${conversationId}`);
        return preventedUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllPreventedUser, getPreventedUserId };