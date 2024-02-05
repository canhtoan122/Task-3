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
let insertHidden = async (conversationId, type, pin) => {
    try {
        let temp = await query(`INSERT INTO hidden (conversationId, type, pin) 
        VALUES (${conversationId}, '${type}', '${pin}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertHidden };