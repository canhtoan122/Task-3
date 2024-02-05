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
let deletePinId = async (id) => {
    try {
        let pins = await query(`DELETE FROM pin WHERE id = ${id}`);
        return pins;
    } catch (err) {
        console.log(err);
    }
}
let deletePin = async (id) => {
    try {
        let pins = await query(`DELETE * FROM pin`);
        return pins;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deletePinId, deletePin };