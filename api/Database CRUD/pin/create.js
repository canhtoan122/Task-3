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
let insertPin = async (conversationId, type, action) => {
    try {
        let temp = await query(`INSERT INTO pin (conversationId, type, action) 
        VALUES (${conversationId}, '${type}', '${action}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertPin };