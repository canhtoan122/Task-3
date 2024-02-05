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
let updateIndividualChat = async (id, content, conversationId) => {
    try {
        let invididualChats = await query(`UPDATE invididualchat
        SET content = '${content}', conversationId = ${conversationId}
        WHERE id = ${id}`);
        return invididualChats;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateIndividualChat };