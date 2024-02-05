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
let deleteGroupId = async (inviteId) => {
    try {
        let groups = await query(`DELETE FROM groupchat WHERE inviteId = ${inviteId}`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
let deleteGroup = async () => {
    try {
        let groups = await query(`DELETE * FROM groupchat`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteGroupId, deleteGroup};