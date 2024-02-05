var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../users/login/verifyToken');
let { updatePin } = require('../../../Database CRUD/pin/update');
let { getPinId, getAllPin } = require('../../../Database CRUD/pin/read');
let { updateisPinned } = require('../../../Database CRUD/conversation/update');
let { getAllConversation } = require('../../../Database CRUD/conversation/read');

router.put('/', async function (req, res, next) {
    try{
        const { action, conversationId, token } = req.body;
        let user = await verifyToken(token);
        if(user.role != 1 && user.role != 2 && user.role != 3) {
            res.end("User role is not allow for this function.");
            return;
        }
        let pins = await getPinId(conversationId);
        if(action == "unpin"){
            await updatePin(pins[0].id, conversationId, "off", action);
            await updateisPinned(conversationId, true);
        }else{
            await updatePin(pins[0].id, conversationId, "on", action);
            await updateisPinned(conversationId, false);
        }
        let result = await getAllPin();
        let temp = await getAllConversation();
        result = [...temp];
        res.json(result);
    }catch(err){
        console.log(err);
    }
});

module.exports = router;