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
let updatePin = async (id, conversationId, type, action) => {
    try {
        let pins = await query(`UPDATE pin
        SET conversationId = ${conversationId}, type = '${type}', action = '${action}'
        WHERE id = ${id}`);
        return pins;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updatePin };