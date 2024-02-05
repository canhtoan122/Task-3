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
let updateNote = async (noteId, conversationId, type, isPinned, content) => {
    try {
        let notes = await query(`UPDATE note
        SET conversationId = ${conversationId}, type = '${type}', isPinned = '${isPinned}', content = '${content}'
        WHERE noteId = ${noteId}`);
        return notes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateNote };