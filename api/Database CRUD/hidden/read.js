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
let getAllHidden = async () => {
    try {
        let hiddens = await query(`SELECT * FROM hidden`);
        return hiddens;
    } catch (err) {
        console.log(err);
    }
}
let getHiddenId = async (id) => {
    try {
        let hiddens = await query(`SELECT * FROM hidden WHERE id = ${id}`);
        return hiddens;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllHidden, getHiddenId };