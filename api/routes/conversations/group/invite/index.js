var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../../users/login/verifyToken');
let { createToken } = require('../../../users/signIn/createToken');
let jwt = require('jsonwebtoken');
let { updateUser, updateUserConversationId } = require('../../../../Database CRUD/user/update');
let { getUserToken } = require('../../../../Database CRUD/user/read');
let { updateMemberIds } = require('../../../../Database CRUD/groupChat/update');
let { getGroupChatId, getAllGroupChat } = require('../../../../Database CRUD/groupChat/read');
let { getPreventedUserId } = require('../../../../Database CRUD/preventJoinGroup/read');
let { getUserId } = require('../../../../Database CRUD/user/read');

router.delete('/', async function (req, res, next) {
    try{
        let { inviteId, userId, token } = req.body;
        let user = await verifyToken(token);
        if(user.role != 1) {
            res.end("This user is not allow to use this function.");
            return;
        }
        let groupChat = await getGroupChatId(inviteId);
        if(groupChat.length === 0){
            res.end("Cannot found this group chat.");
            return;
        }
        let users = await getUserId(userId);
        if(users.length === 0){
            res.end("Cannot found this user id.");
            return;
        }
        let tempUser = await verifyToken(users[0].token);
        let memberIdsString = '';
        if(groupChat[0].memberIds != null){
            const memberIdsArray = groupChat[0].memberIds.split(', ').map(member => member.trim());
            const userIdIndex = memberIdsArray.indexOf(tempUser.username);
            if (userIdIndex !== -1) {
                memberIdsArray.splice(userIdIndex, 1);
        
                memberIdsString = memberIdsArray.join(', ');
                await updateMemberIds(inviteId, memberIdsString);
            } else {
                res.end("User is not a member of this group chat.");
                return;
            }
        }
        let result = await getAllGroupChat();
        result.push(user);
        res.json(result);
    }catch(err){
        console.log(err);
    }
});
router.post('/', async function (req, res, next) {
    try{
        const { inviteId, token } = req.body;
        let groupChat = await getGroupChatId(inviteId);
        let conversationId = groupChat[0].conversationId;
        let user = await verifyToken(token);
        if(user.role != 1 && user.role != 2 && user.role != 3) {
            user.role = 4;
            let userId = await getUserToken(token);
            let newToken = await createToken(user);
            let decodedToken = jwt.decode(newToken);
            let expired_at = decodedToken && decodedToken.iat;
            let update = await updateUser(userId, token, expired_at);
            user.token = newToken;
            user.expired_at = expired_at;
            user.request = "Please contact owner for permission";
            res.json(user);
            return;
        }
        let preventUsers = await getPreventedUserId(conversationId);
        let preventUser = preventUsers[0].preventIds.split(', ').map(member => member.trim());
        let temp = await getUserToken(token);
        let userId = temp[0].userId;
        for(let i = 0; i < preventUser.length; i++){
            if(preventUser[i] === userId){
                res.end("This user is banned from the group chat.");
                return;
            }
        }
        let memberIdsString = '';
        if(groupChat[0].memberIds != null){
            const memberIdsArray = groupChat[0].memberIds.split(', ').map(member => member.trim());
            if (!memberIdsArray.includes(user.username)) {
                memberIdsArray.push(user.username);
                memberIdsString = memberIdsArray.join(', ');
                await updateMemberIds(inviteId, memberIdsString);
                await updateUserConversationId(userId, conversationId);
            } else {
                // Username already exists, handle accordingly
                res.json({ error: 'Username already exists in the group chat.' });
                return;
            }
        }else{
            let memberIds = [];
            memberIds.push(user.username);
            memberIdsString = memberIds.join('');
            await updateMemberIds(inviteId, memberIdsString);
            await updateUserConversationId(userId, conversationId);
        }
        let result = await getAllGroupChat();
        result.push(user);
        res.json(result);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;