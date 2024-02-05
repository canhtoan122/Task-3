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
let insertPreventedUser = async (conversationId, preventIds) => {
    try {
        let temp = await query(`INSERT INTO preventjoingroup (conversationId, preventIds) 
        VALUES (${conversationId}, '${preventIds}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertPreventedUser };