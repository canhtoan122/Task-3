var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
        let conversationSetting = await query(`SELECT * FROM conversationSetting WHERE conversationId = ${conversationId}`);
        return conversationSetting;
    }catch(err){
        console.log(err);
    }
}
let createConversationId = async (conversationId, isPinned) => {
    try {
      let conversationSettings = await query('SELECT * FROM conversationSetting');
      let create = await query(`UPDATE conversationSetting 
      SET conversationId = '${conversationId}', isPinned = '${isPinned}'
      WHERE inviteId = ${conversationSettings[0].inviteId}`);
      return conversationSettings;
    } catch (err) {
      console.log(err);
    }
}
let updateConversationId = async (conversationId, isPinned) => {
try {
    let conversationSettings = await query(`UPDATE conversationSetting 
    SET isPinned = '${isPinned}'
    WHERE conversationId = ${conversationId};`);
    return conversationSettings;
} catch (err) {
    console.log(err);
}
}
router.put('/', async function (req, res, next) {
    const { action, conversationId } = req.body;
    let isPinned = null;
    if(action == "pin"){
        isPinned = true;
    }else if(action == "unpin"){
        isPinned = false;
    }
    let conversationSetting = await getConversationSetting(conversationId);
    if(conversationSetting[0].conversationId == null){
        await createConversationId(conversationId, isPinned);
        conversationSetting[0].conversationId = conversationId;
        conversationSetting[0].isPinned = isPinned;
    } else if(conversationSetting[0].conversationId != null){
        await updateConversationId(conversationId, isPinned);
        conversationSetting[0].conversationId = conversationId;
        conversationSetting[0].isPinned = isPinned;
    }
    res.json(conversationSetting);
});

module.exports = router;