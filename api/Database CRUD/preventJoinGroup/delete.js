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
let deletePreventedUserId = async (id) => {
    try {
        let preventedUsers = await query(`DELETE FROM preventjoingroup WHERE id = ${id}`);
        return preventedUsers;
    } catch (err) {
        console.log(err);
    }
}
let deletePreventedUser = async (id) => {
    try {
        let preventedUsers = await query(`DELETE * FROM preventjoingroup`);
        return preventedUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deletePreventedUserId, deletePreventedUser };