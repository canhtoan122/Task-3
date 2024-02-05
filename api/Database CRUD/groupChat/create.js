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
let inserGroupChat = async (conversationId, type, name, memberIds, content) => {
    try {
        let temp = await query(`INSERT INTO groupchat (conversationId, type, name, memberIds, content) 
        VALUES (${conversationId}, '${type}', '${name}', '${memberIds}', '${content}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { inserGroupChat };