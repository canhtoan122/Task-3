var express = require('express');
var router = express.Router();
let mysql = require('mysql');
let { verifyToken } = require('../../login/verifyToken');
let jwt = require('jsonwebtoken');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iris',
});
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getConversationSetting = async (conversationId) => {
    try{
        let conversationSetting = await query(`SELECT * FROM conversationSetting WHERE conversationId = '${conversationId}'`);
        return conversationSetting;
    }catch(err){
        console.log(err);
    }
}
let updateConversationSetting = async (conversationSetting) => {
    try{
        let update = await query(`UPDATE conversationSetting
        SET isPinned = ${conversationSetting.isPinned}, content = ${conversationSetting.content}
        WHERE inviteId = ${conversationSetting.inviteId}`);
        return conversationSetting;
    }catch(err){
        console.log(err);
    }
}
router.post('/', async function (req, res, next) {
    let { conversationId, token, isPinned, content } = req.body;
    let conversationSetting = await getConversationSetting(conversationId);
    if(conversationSetting.length === 0){
        res.end("There is no conversationSetting that have conversationId:" + conversationId);
        return;
    }else{
        await updateConversationSetting(conversationSetting[0]);
        conversationSetting[0].isPinned = isPinned;
        conversationSetting[0].content = content;
    }
    res.json(conversationSetting);
  });
  
  module.exports = router;