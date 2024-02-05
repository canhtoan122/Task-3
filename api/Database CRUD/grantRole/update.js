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
let updateGrantUser = async (id, owners, admins, members) => {
    try {
        let grantUsers = await query(`UPDATE grantrole
        SET owners = '${owners}', admins = '${admins}', members = '${members}'
        WHERE id = ${id}`);
        return grantUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateGrantUser };