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
let getAllPin = async () => {
    try {
        let pins = await query(`SELECT * FROM pin`);
        return pins;
    } catch (err) {
        console.log(err);
    }
}
let getPinId = async (conversationId) => {
    try {
        let pins = await query(`SELECT * FROM pin WHERE conversationId = ${conversationId}`);
        return pins;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllPin, getPinId };