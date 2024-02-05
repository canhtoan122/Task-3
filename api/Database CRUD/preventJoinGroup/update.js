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
let updatePreventedUser = async (id, conversationId, preventIds) => {
    try {
        let preventedUsers = await query(`UPDATE preventjoingroup
        SET conversationId = ${conversationId}, preventIds = '${preventIds}'
        WHERE id = ${id}`);
        return preventedUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updatePreventedUser };