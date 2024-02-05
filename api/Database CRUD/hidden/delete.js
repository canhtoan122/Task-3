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
let deleteHiddenId = async (id) => {
    try {
        let hiddens = await query(`DELETE FROM hidden WHERE id = ${id}`);
        return hiddens;
    } catch (err) {
        console.log(err);
    }
}
let deleteHidden = async () => {
    try {
        let hiddens = await query(`DELETE * FROM hidden`);
        return hiddens;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteHiddenId, deleteHidden };