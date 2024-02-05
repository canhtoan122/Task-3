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
let getAllIndividualChat = async () => {
    try {
        let invididualChats = await query(`SELECT * FROM invididualchat`);
        return invididualChats;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllIndividualChat };