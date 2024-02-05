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
let getAllGrantUser = async () => {
    try {
        let grantUsers = await query(`SELECT * FROM grantrole`);
        return grantUsers;
    } catch (err) {
        console.log(err);
    }
}
let getGrantUserId = async (conversationId) => {
    try {
        let grantUsers = await query(`SELECT * FROM grantrole WHERE conversationId = ${conversationId}`);
        return grantUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllGrantUser, getGrantUserId };