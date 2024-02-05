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
let insertUser = async (token, expired_at) => {
    try {
        let temp = await query(`INSERT INTO user (token, expired_at) 
        VALUES ('${token}', '${expired_at}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertUser };