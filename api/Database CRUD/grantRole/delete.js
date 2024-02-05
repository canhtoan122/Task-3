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
let deleteGrantUserId = async (id) => {
    try {
        let grantUsers = await query(`DELETE FROM grantrole WHERE id = ${id}`);
        return grantUsers;
    } catch (err) {
        console.log(err);
    }
}
let deleteGrantUser = async () => {
    try {
        let grantUsers = await query(`DELETE * FROM grantrole`);
        return grantUsers;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteGrantUserId, deleteGrantUser };