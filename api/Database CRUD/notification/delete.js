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
let deleteNotificationId = async (id) => {
    try {
        let notifications = await query(`DELETE FROM notification WHERE id = ${id}`);
        return notifications;
    } catch (err) {
        console.log(err);
    }
}
let deleteNotification = async () => {
    try {
        let notifications = await query(`DELETE * FROM notification`);
        return notifications;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteNotificationId, deleteNotification };