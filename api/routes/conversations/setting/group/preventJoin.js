var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../../users/login/verifyToken');
let { updatePreventedUser } = require('../../../../Database CRUD/preventJoinGroup/update');
let { getPreventedUserId, getAllPreventedUser } = require('../../../../Database CRUD/preventJoinGroup/read');

router.put('/', async function (req, res, next) {
    let { conversationId, preventIds, action, token } = req.body;
    let user = await verifyToken(token);
    if (user.role != 1 && user.role != 2) {
        res.end("User role is not allow for this function.");
        return;
    }
    let preventIdString = '';
    if(action == "prevent"){
        let preventUsers = await getPreventedUserId(conversationId);
        if(preventUsers[0].preventIds == null){
            let preventUser = [];
            preventUser.push(preventIds);
            preventIdString = preventUser.join(', ');
            await updatePreventedUser(preventUsers[0].id, conversationId, preventIdString);
        }else{
            let preventUser = preventUsers[0].preventIds.split(', ').map(member => member.trim());
            preventUser.push(preventIds);
            preventIdString = preventUser.join(', ');
            await updatePreventedUser(preventUsers[0].id, conversationId, preventIdString);
        }
    }else if(action == "unprevent"){
        let preventUsers = await getPreventedUserId(conversationId);
        let preventUser = preventUsers[0].preventIds.split(', ').map(member => member.trim());
        let indexOfPreventIds = preventUser.indexOf(preventIds);
        if (indexOfPreventIds !== -1) {
            preventUser.splice(indexOfPreventIds, 1);
        }
        preventIdString = preventUser.join(', ');
        await updatePreventedUser(preventUsers[0].id, conversationId, preventIdString);
    }
    let result = await getAllPreventedUser();
    res.json(result);
  });
  
  module.exports = router;