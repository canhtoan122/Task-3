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
let insertVote = async (conversationId, type, isPinned, question, option, allowMultipleAnswers, allowAddOption, hideMemberAnswers, allowChangeAnswers, duration) => {
    try {
        let temp = await query(`INSERT INTO vote (conversationId, type, isPinned, question, option, allowMultipleAnswers, allowAddOption, hideMemberAnswers, allowChangeAnswers, duration) 
        VALUES (${conversationId}, '${type}', '${isPinned}', '${question}', '${option}', '${allowMultipleAnswers}', '${allowAddOption}', '${hideMemberAnswers}', '${allowChangeAnswers}', '${duration}')`);
        return temp;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { insertVote };