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
let deleteNoteId = async (noteId) => {
    try {
        let notes = await query(`DELETE FROM note WHERE noteId = ${noteId}`);
        return notes;
    } catch (err) {
        console.log(err);
    }
}
let deleteNote = async () => {
    try {
        let notes = await query(`DELETE * FROM note`);
        return notes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteNoteId, deleteNote };