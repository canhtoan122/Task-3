var express = require('express');
var router = express.Router();
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
        let conversations = updateConversation(conversation.id, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }else if(conversation.isConversationHidden == false){
        conversation.isConversationHidden = true;
        conversation.pin = pin;
        let conversations = updateConversation(conversation.id, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }else if(conversation.isConversationHidden == true){
        conversation.isConversationHidden = false;
        conversation.pin = pin;
        let conversations = updateConversation(conversation.id, conversation.isConversationHidden, conversation.pin);
        return conversation;
    }
}
router.post('/', async function (req, res, next) {
    let { conversationId, pin } = req.body;
    let conversations = await getConversation();
    let conversationResult = conversations.find((item) => {
        return item.conversationId == conversationId;
    });
    if(conversationResult != undefined){
        let result = turnOnOffHidden(conversationResult, pin);
        res.json(result);
    }else{
        res.end(false);
    }
});
module.exports = router;