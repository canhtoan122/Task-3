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
let updateUser = async (userId, token, expired_at) => {
    try {
        let users = await query(`UPDATE user
        SET token = '${token}', expired_at = '${expired_at}'
        WHERE userId = ${userId}`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
let updateUserConversationId = async (userId, conversationId) => {
    try {
        let users = await query(`UPDATE user
        SET conversationId = ${conversationId}
        WHERE userId = ${userId}`);
        return users;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateUser, updateUserConversationId };