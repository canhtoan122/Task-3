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
let insertConversation = async (isNotification, isConversationHidden, isPinned, isNoted, isVoted) => {
    try {
        let temp = await query(`INSERT INTO conversation (isNotification, isConversationHidden, isPinned, isNoted, isVoted) 
        VALUES (${isNotification}, ${isConversationHidden}, ${isPinned}, ${isNoted}, ${isVoted})`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertConversation };