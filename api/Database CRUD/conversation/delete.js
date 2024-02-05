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
let deleteConversationId = async (conversationId) => {
    try {
        let conversations = await query(`DELETE FROM conversation WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let deleteConversation = async () => {
    try {
        let conversations = await query(`DELETE * FROM conversation`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteConversationId, deleteConversation };