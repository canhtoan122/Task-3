var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../users/login/verifyToken');
let { getVoteId, getAllVote } = require('../../../Database CRUD/vote/read');
let { updateVote } = require('../../../Database CRUD/vote/update');
let { updateisVoted } = require('../../../Database CRUD/conversation/update');
let { getAllConversation } = require('../../../Database CRUD/conversation/read');

router.post('/', async function (req, res, next) {
    const { token, conversationId, isPinned, question, option, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers } = req.body;
    let user = await verifyToken(token);
    if(user.role != 1 && user.role != 2 && user.role != 3) {
        res.end("User role is not allow for this function.");
        return;
    }
    let vote = await getVoteId(conversationId);
    if(isPinned == true){
        await updateVote(vote[0].id, conversationId, "on", isPinned, question, option, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers);
        await updateisVoted(conversationId, true, isPinned);
    }else{
        await updateVote(vote[0].id, conversationId, "off", isPinned, question, option, allowMultipleAnswer, allowAddOption, hiddenResultBeforeAnswer, allowChangeAnswers);
        await updateisVoted(conversationId, false, isPinned);
    }
    let result = await getAllVote();
    let temp = await getAllConversation();
    result = [...temp];
    res.json(result);
});

module.exports = router;