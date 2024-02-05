var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../users/login/verifyToken');
let { updateHidden } = require('../../../Database CRUD/hidden/update');
let { getAllHidden, getHiddenId } = require('../../../Database CRUD/hidden/read');
let { updateisConversationHidden } = require('../../../Database CRUD/conversation/update');
let { getAllConversation } = require('../../../Database CRUD/conversation/read');


router.post('/', async function (req, res, next) {
    try{
        let { conversationId, pin, token } = req.body;
        let user = await verifyToken(token);
        if(user.role != 1 && user.role != 2 && user.role != 3) {
            res.end("User role is not allow for this function.");
            return;
        }
        let hiddens = await getAllHidden();
        let hidden = hiddens.find((item) => {
            return item.conversationId == conversationId;
        });
        let hiddenId = hidden.id;
        let resultHidden = await getHiddenId(hiddenId);
        if(resultHidden[0].type == "on"){
            if(resultHidden[0].pin == pin){
                await updateHidden(hiddenId, "off", null);
            }else{
                res.end("Pin is not correct!");
                return;
            }
        }else{
            await updateHidden(hiddenId, "on", pin);
            await updateisConversationHidden(conversationId, true);
        }
        let temp = await getAllHidden();
        let result = await getAllConversation();
        result = [...temp];
        res.json(result);
    }catch(err){
        console.log(err);
    }
});
module.exports = router;