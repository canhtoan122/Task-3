var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let conversationGroups = require('./Model/conversationGroup');
let { verifyToken } = require('../login/verifyToken');
let { createToken } = require('../signIn/createToken');
let jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getUserId = async (token) => {
    try{
        let users = await query(`SELECT * FROM user`);
        let user = users.find((item) => {
            return users.token = token;
        });
        return user.id;
    }catch(err){
        console.log(err);
    }
}
let createGroupChat = async (conversationGroup) => {
    try{
        let memberIdsString = '';
        
        if (conversationGroup.memberIds && conversationGroup.memberIds.length > 0) {
            memberIdsString = conversationGroup.memberIds.join(', ');
        } else {
            // Handle the case where memberIds is empty or undefined
            memberIdsString = 'null'; // Replace with an appropriate default value or handle as needed
        }
        let temp = await query(`INSERT INTO conversationSetting (type, name, memberIds)
        VALUE (${conversationGroup.type}, '${conversationGroup.name}', ${memberIdsString});
        `);
        return conversationGroup;
    }catch (err){
        console.log(err);
    }
}
let updateToken = async(id, token, expired_at)=>{
    try{
        let conversations = await query(`UPDATE user
        SET token = '${token}', expired_at = '${expired_at}'
        WHERE id = ${id}`);
        return conversations;
    }catch(err){
        console.log(err);
    }
}
router.post('/', async function (req, res, next) {
    const { type, name, memberIds, token } = req.body;
    let conversationGroup = new conversationGroups(type, name, memberIds);
    let result = await createGroupChat(conversationGroup);
    let user = await verifyToken(token);
    user.role = 1;
    let userId = await getUserId(token);
    let newToken = await createToken(user);
    let decodedToken = jwt.decode(newToken);
    let expired_at = decodedToken && decodedToken.iat;
    let updateNewToken = await updateToken(userId, newToken, expired_at);
    user.token = newToken;
    res.json(user);
});

module.exports = router;