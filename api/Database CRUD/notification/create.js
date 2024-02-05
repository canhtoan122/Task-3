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
let insertNotification = async (conversationId, type, time) => {
    try {
        let temp = await query(`INSERT INTO notification (conversationId, type, time) 
        VALUES ('${conversationId}', '${type}', '${time}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertNotification };