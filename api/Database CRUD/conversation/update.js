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
let updateConversation = async (conversationId, isNotification, isConversationHidden, isPinned, isNoted, isVoted) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isNotification = ${isNotification}, isConversationHidden = ${isConversationHidden}, isPinned = ${isPinned}, isNoted = ${isNoted}, isVoted = ${isVoted}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateisNotification = async (conversationId, isNotification) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isNotification = ${isNotification}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateisConversationHidden = async (conversationId, isConversationHidden) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isConversationHidden = ${isConversationHidden}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateisPinned = async (conversationId, isPinned) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isPinned = ${isPinned}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateisNoted = async (conversationId, isNoted, isPinned) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isNoted = ${isNoted}, isPinned = ${isPinned}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateisVoted = async (conversationId, isVoted, isPinned) => {
    try {
        let conversations = await query(`UPDATE conversation
        SET isVoted = ${isVoted}, isPinned = ${isPinned}
        WHERE conversationId = ${conversationId}`);
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
module.exports = { updateConversation, updateisNotification, updateisConversationHidden, updateisPinned, updateisNoted, updateisVoted };