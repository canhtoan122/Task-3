var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let { verifyToken } = require('../../login/verifyToken');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getConversation = async () => {
    try {
        let conversations = await query('SELECT * FROM conversationSetting');
        return conversations;
    } catch (err) {
        console.log(err);
    }
}
let updateConversation = async (id, isConversationHidden, pin) => {
    try{
        let conversations = await query(`UPDATE conversationSetting
        SET isConversationHidden = ${isConversationHidden}, pin = '${pin}'
        WHERE inviteId = ${id}`);
        return conversations;
    }catch(err){
        console.log(err);
    }
}
function turnOnOffHidden(conversation, pin){
    if(conversation.isConversationHidden == null){
        conversation.isConversationHidden = true;
        conversation.pin = pin;
        let conversations = updateConversation(conversation.inviteId, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }else if(conversation.isConversationHidden == false){
        conversation.isConversationHidden = true;
        conversation.pin = pin;
        let conversations = updateConversation(conversation.inviteId, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }else if(conversation.isConversationHidden == true){
        conversation.isConversationHidden = false;
        conversation.pin = pin;
        let conversations = updateConversation(conversation.inviteId, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }
}
router.post('/', async function (req, res, next) {
    let { conversationId, pin, token } = req.body;
    let user = await verifyToken(token);
    if(user.role != 1 && user.role != 2 && user.role != 3) {
        res.end("User role is not allow for this function.");
        return;
    }
    let conversations = await getConversation();
    let conversationResult = conversations.find((item) => {
        return item.conversationId == conversationId;
    });
    if(conversationResult === undefined){
        res.end("conversationId not found.");
        return;
    }
    let result = turnOnOffHidden(conversationResult, pin);
    res.json(result);
});
module.exports = router;