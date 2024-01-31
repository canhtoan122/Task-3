var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let conversationGroups = require('../../Model/conversationGroup');
let { verifyToken } = require('../../../login/verifyToken');
let { createToken } = require('../../../signIn/createToken');
let jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iris',
});
const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getGroupChat = async (inviteId) => {
    try{
        let groupChat = await query(`SELECT * FROM conversationSetting WHERE inviteId = ${inviteId}`);
        return groupChat;
    }catch(err){
        console.log(err);
    }
}
let updateConversationGroup = async (conversationGroup, inviteId) => {
    try{
        let groupChat = await query(`UPDATE conversationSetting
        SET type = ${conversationGroup.type}, name = '${conversationGroup.name}', memberIds = '${conversationGroup.memberIds}'
        WHERE inviteId = ${inviteId}`);
        return conversationGroup;
    }catch(err){
        console.log(err);
    }
}
let findUserId = async(token) => {
    try{
        let users = await query(`SELECT * FROM user WHERE token = '${token}'`);
        return users[0].userId;
    }catch(err){
        console.log(err);
    }
}
let updateNewUser = async(userId, token, expired_at) =>{
    try{
        let updateUser = await query(`UPDATE user 
        SET token = '${token}', expired_at = '${expired_at}'
        WHERE userId = ${userId}`);
        return updateUser;
    }catch(err){
        console.log(err);
    }
}
router.post('/', async function (req, res, next) {
    const { inviteId, token } = req.body;
    let groupChat = await getGroupChat(inviteId);
    let user = await verifyToken(token);
    if(user.role != 1 && user.role != 2) {
        user.role = 4;
        let userId = await findUserId(token);
        let newToken = await createToken(user);
        let decodedToken = jwt.decode(newToken);
        let expired_at = decodedToken && decodedToken.iat;
        let updateUser = await updateNewUser(userId, token, expired_at);
        user.token = newToken;
        user.expired_at = expired_at;
        user.request = "Please contact owner for permission";
        res.json(user);
        return;
    }
    let memberIdsString = '';
    if(groupChat[0].memberIds != null){
        const memberIdsArray = groupChat[0].memberIds.split(', ').map(member => member.trim());
        memberIdsArray.push(user.username);
        memberIdsString = memberIdsArray.join(', ');
    }else{
        let memberIds = [];
        memberIds.push(user.username);
        memberIdsString = memberIds.join(', ');
    }
    let conversationGroup = new conversationGroups(groupChat[0].type, groupChat[0].name, memberIdsString);
    let update = await updateConversationGroup(conversationGroup, inviteId);
    res.json(update);
});

module.exports = router;