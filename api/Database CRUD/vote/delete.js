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
let deleteVoteId = async (id) => {
    try {
        let votes = await query(`DELETE FROM vote WHERE id = ${id}`);
        return votes;
    } catch (err) {
        console.log(err);
    }
}
let deleteVote = async () => {
    try {
        let votes = await query(`DELETE * FROM vote`);
        return votes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { deleteVoteId, deleteVote };