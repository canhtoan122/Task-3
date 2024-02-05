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
let updateVote = async (id, conversationId, type, isPinned, question, option, allowMultipleAnswers, allowAddOption, hideMemberAnswers, allowChangeAnswers, duration) => {
    try {
        let votes = await query(`UPDATE vote
        SET conversationId = ${conversationId}, type = '${type}', isPinned = ${isPinned}, question = '${question}', option = '${option}', 
        allowMultipleAnswers = '${allowMultipleAnswers}', allowAddOption = '${allowAddOption}', hideMemberAnswers = '${hideMemberAnswers}',
        allowChangeAnswers = '${allowChangeAnswers}', duration = '${duration}'
        WHERE id = ${id}`);
        return votes;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateVote };