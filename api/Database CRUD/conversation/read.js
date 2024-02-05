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
let getAllConversation = async () => {
    try {
        let conversations = await query(`SELECT * FROM conversation`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllConversation };