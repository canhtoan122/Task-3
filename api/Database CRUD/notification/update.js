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
let updateNotification = async (id, conversationId, type, time) => {
    try {
        let notifications = await query(`UPDATE notification
        SET conversationId = ${conversationId}, type = '${type}', time = '${time}'
        WHERE id = ${id}`);
        return notifications;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateNotification };