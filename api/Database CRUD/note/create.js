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
let insertNote = async (conversationId, type, isPinned, content) => {
    try {
        let temp = await query(`INSERT INTO note (conversationId, type, isPinned, content) 
        VALUES (${conversationId}, '${type}', '${isPinned}', '${content}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertNote };