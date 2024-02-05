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
let getAllNote = async () => {
    try {
        let notes = await query(`SELECT * FROM note`);
        return notes;
    } catch (err) {
        console.log(err);
    }
}
let getNoteId = async (conversationId) => {
    try {
        let notes = await query(`SELECT * FROM note WHERE conversationId = ${conversationId}`);
        return notes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllNote, getNoteId };