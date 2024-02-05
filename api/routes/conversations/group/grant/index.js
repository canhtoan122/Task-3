var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../../users/login/verifyToken');
let { createToken } = require('../../../users/signIn/createToken');
let jwt = require('jsonwebtoken');
let { updateUser } = require('../../../../Database CRUD/user/update');
let { getUserId } = require('../../../../Database CRUD/user/read');
let { getGrantUserId, getAllGrantUser } = require('../../../../Database CRUD/grantRole/read');
let { updateGrantUser } = require('../../../../Database CRUD/grantRole/update');
let { getAllConversation } = require('../../../../Database CRUD/conversation/read');

router.put('/', async function (req, res, next) {
    try{
        const { conversationId, token, userId, role } = req.body;
        let user = await verifyToken(token);
        if(user.role != 1) {
            res.end("User role is not allow for this function.");
            return;
        }
        let users = await getUserId(userId);
        if(users.length === 0){
            res.end("UserId is not exist");
            return;
        }
        let newUser = await verifyToken(users[0].token);
        newUser.role = role;
        let newToken = await createToken(newUser);
        let decodedToken = jwt.decode(newToken);
        let expired_at = decodedToken && decodedToken.iat;
        let update = await updateUser(userId, newToken, expired_at);
        newUser.token = newToken;
        let grantRole = await getGrantUserId(conversationId);
        if(grantRole.length === 0){
            res.end("conversationId is not exist!");
            return;
        }
        let adminsString = '';
        let memberString = '';
        if(role == 1){
            let admin = grantRole[0].admins.split(', ').map(member => member.trim());
            admin.push(grantRole[0].owner);
            adminsString = admin.join(', ');
            let update = await updateGrantUser(grantRole[0].id, userId, adminsString, []);
        }else if(role == 2){
            let admin = grantRole[0].admins.split(', ').map(member => member.trim());
            admin.push(userId);
            adminsString = admin.join(', ');
            let update = await updateGrantUser(grantRole[0].id, grantRole[0].owner, adminsString, []);
        }else if(role == 3){
            let members = grantRole[0].members.split(', ').map(member => member.trim());
            members.push(userId);
            memberString = members.join(', ');
            let update = await updateGrantUser(grantRole[0].id, grantRole[0].owner, grantRole[0].admin, memberString);
        }else{
            res.end("Waiting for owner to accepts!");
            return;
        }
        let result = await getAllGrantUser();
        let temp = await getAllConversation();
        result.push(...temp);
        result.push(newUser);
        res.json(result);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;