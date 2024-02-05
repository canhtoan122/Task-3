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
let getAllGroupChat = async () => {
    try {
        let groups = await query(`SELECT * FROM groupchat`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
let getGroupChatId = async (inviteId) => {
    try {
        let groups = await query(`SELECT * FROM groupchat WHERE inviteId = ${inviteId}`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllGroupChat, getGroupChatId};