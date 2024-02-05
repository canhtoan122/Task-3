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
let insertGrantUsers = async (conversationId, owners, admins, members) => {
    try {
        let temp = await query(`INSERT INTO grantrole (conversationId, owners, admins, members) 
        VALUES (${conversationId}, '${owners}', '${admins}', '${members}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertGrantUsers };