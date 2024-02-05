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
let updateGroupChat = async (inviteId, type, name, memberIds, content) => {
    try {
        let groups = await query(`UPDATE groupchat
        SET type = '${type}', name = '${name}', memberIds = '${memberIds}', content = '${content}'
        WHERE inviteId = ${inviteId}`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
let updateMemberIds = async (inviteId, memberIds) => {
    try {
        let groups = await query(`UPDATE groupchat
        SET memberIds = '${memberIds}'
        WHERE inviteId = ${inviteId}`);
        return groups;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateGroupChat, updateMemberIds };