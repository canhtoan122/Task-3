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
let getAllVote = async () => {
    try {
        let votes = await query(`SELECT * FROM vote`);
        return votes;
    } catch (err) {
        console.log(err);
    }
}
let getVoteId = async (conversationId) => {
    try {
        let votes = await query(`SELECT * FROM vote WHERE conversationId=${conversationId}`);
        return votes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { getAllVote, getVoteId };