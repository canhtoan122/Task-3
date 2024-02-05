var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../users/login/verifyToken');
let { updateNote } = require('../../../Database CRUD/note/update');
let { getNoteId, getAllNote } = require('../../../Database CRUD/note/read');
let { updateisNoted } = require('../../../Database CRUD/conversation/update');
let { getAllConversation } = require('../../../Database CRUD/conversation/read');


router.post('/', async function (req, res, next) {
    try{
        let { conversationId, token, isPinned, content } = req.body;
        let user = await verifyToken(token);
        if(user.role != 1 && user.role != 2 && user.role != 3) {
            res.end("User role is not allow for this function.");
            return;
        }
        let note = await getNoteId(conversationId);
        if(isPinned == true){
            await updateNote(note[0].noteId, conversationId, "on", isPinned, content);
            await updateisNoted(conversationId, true, isPinned);
        }
        else{
            await updateNote(note[0].noteId, conversationId, "off", isPinned, content);
            await updateisNoted(conversationId, false, isPinned);
        }
        let result = await getAllNote();
        let temp = await getAllConversation();
        result = [...temp];
        res.json(result);
    }catch(err){
        console.log(err);
    }
  });
  
  module.exports = router;