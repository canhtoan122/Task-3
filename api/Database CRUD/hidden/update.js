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
let updateHidden = async (id, type, pin) => {
    try {
        let hiddens = await query(`UPDATE hidden
        SET type = '${type}', pin = '${pin}'
        WHERE id = ${id}`);
        return hiddens;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateHidden };