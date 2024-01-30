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
let getConversationSetting = async(conversationId) => {
    try{
        let conversationSetting = await query(`SELECT * FROM conversationSetting WHERE conversationId = ${conversationId}`);
        return conversationSetting;
    }catch(err){
        console.log(err);
    }
}
let updateVote = async(conversationId, isPinned, question, option, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers) =>{
    try{
        let createConversationSetting = await query(`UPDATE conversationSetting
        SET isPinned = ${isPinned}, question = '${question}', option = '${option}', allowMultipleAnswer = ${allowMultipleAnswer}, 
        allowAddOption = ${allowAddOption}, hiddenResultBeforeAnswer = ${hiddenResultBeforeAnswer}, allowChangeAnswers = ${allowChangeAnswers}
        WHERE conversationId = ${conversationId}`);
        return createConversationSetting;
    }catch(err){
        console.log(err);
    }
}
router.post('/', async function (req, res, next) {
    const { conversationId, isPinned, question, option, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers } = req.body;
    let conversationSetting = await getConversationSetting(conversationId);
    let optionString = "";
    if(conversationSetting[0].question == null){
        optionString = option.join(', ');
        await updateVote(conversationId, isPinned, question, optionString, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers);
        conversationSetting[0].isPinned = isPinned;
        conversationSetting[0].question = question;
        conversationSetting[0].option = optionString;
        conversationSetting[0].allowMultipleAnswer = allowMultipleAnswer;
        conversationSetting[0].allowAddOption = allowAddOption;
        conversationSetting[0].hiddenResultBeforeAnswer = hiddenResultBeforeAnswer;
        conversationSetting[0].allowChangeAnswers = allowChangeAnswers;
    }
    res.json(conversationSetting);
});

module.exports = router;