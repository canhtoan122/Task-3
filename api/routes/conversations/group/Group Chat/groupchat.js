var express = require('express');
var router = express.Router();
let conversationGroups = require('../../../../Models/groupChat');
let { verifyToken } = require('../../../users/login/verifyToken');
let { createToken } = require('../../../users/signIn/createToken');
let { inserGroupChat } = require('../../../../Database CRUD/groupChat/create');
let { insertConversation } = require('../../../../Database CRUD/conversation/create');
let { updateUserConversationId } = require('../../../../Database CRUD/user/update');
let { updateUser } = require('../../../../Database CRUD/user/update');
let { getUserToken } = require('../../../../Database CRUD/user/read');
let { getAllConversation } = require('../../../../Database CRUD/conversation/read');
let { insertNotification } = require('../../../../Database CRUD/notification/create');
let { insertHidden } = require('../../../../Database CRUD/hidden/create');
let { insertPin } = require('../../../../Database CRUD/pin/create');
let { insertNote } = require('../../../../Database CRUD/note/create');
let { insertVote } = require('../../../../Database CRUD/vote/create');
let { insertGrantUsers } = require('../../../../Database CRUD/grantRole/create');
let { insertPreventedUser } = require('../../../../Database CRUD/preventJoinGroup/create');
let { getAllGroupChat, getGroupChatId } = require('../../../../Database CRUD/groupChat/read');
let { getAllNotification } = require('../../../../Database CRUD/notification/read');
let { getAllHidden } = require('../../../../Database CRUD/hidden/read');
let { getAllPin } = require('../../../../Database CRUD/pin/read');
let { getAllNote } = require('../../../../Database CRUD/note/read');
let { getAllVote } = require('../../../../Database CRUD/vote/read');
let { getAllGrantUser } = require('../../../../Database CRUD/grantRole/read');
let { getAllPreventedUser } = require('../../../../Database CRUD/preventJoinGroup/read');
let { deleteGroupId } = require('../../../../Database CRUD/groupChat/delete');
let { deleteConversationId } = require('../../../../Database CRUD/conversation/delete');
let { deleteNotificationId } = require('../../../../Database CRUD/notification/delete');
let { deleteHiddenId } = require('../../../../Database CRUD/hidden/delete');
let { deletePinId } = require('../../../../Database CRUD/pin/delete');
let { deleteNoteId } = require('../../../../Database CRUD/note/delete');
let { deleteVoteId } = require('../../../../Database CRUD/vote/delete');
let { deleteGrantUserId } = require('../../../../Database CRUD/grantRole/delete');
let { deletePreventedUserId } = require('../../../../Database CRUD/preventJoinGroup/delete');
let jwt = require('jsonwebtoken');



router.get('/', async function (req, res, next) {
    let groupChat = [];
    groupChat = groupChat.concat(await getAllGroupChat());
    groupChat = groupChat.concat(await getAllConversation());
    groupChat = groupChat.concat(await getAllNotification());
    groupChat = groupChat.concat(await getAllHidden());
    groupChat = groupChat.concat(await getAllPin());
    groupChat = groupChat.concat(await getAllNote());
    groupChat = groupChat.concat(await getAllVote());
    groupChat = groupChat.concat(await getAllGrantUser());
    groupChat = groupChat.concat(await getAllPreventedUser());
    res.json(groupChat);
});

router.post('/', async function (req, res, next) {
    const { type, name, memberIds, token } = req.body;
    if(token === null){
        res.end("Token is null.");
        return;
    }
    let user = await verifyToken(token);
    user.role = 1;
    let users = await getUserToken(token);
    if(users.length == 0){
        res.end("Cannot find user token");
        return;
    }
    let userId = users[0].userId;
    if(userId === undefined){
        res.end("Cannot find user id");
        return;
    }
    let newToken = await createToken(user);
    let decodedToken = jwt.decode(newToken);
    let expired_at = decodedToken && decodedToken.iat;
    let updateNewToken = await updateUser(userId, newToken, expired_at);
    user.token = newToken;
    if(type === null){
        res.end("Type is null");
        return;
    }else if(name === null){
        res.end("Group Name is null");
        return;
    }else if(memberIds === null){
        res.end("MemberIds is null. You can input []");
        return;
    }
    await insertConversation(false, false, false, false, false);
    let conversations = await getAllConversation();
    let conversationId = conversations[conversations.length - 1].conversationId;
    await updateUserConversationId(userId, conversationId);
    await inserGroupChat(conversationId, type, name, memberIds);
    await insertGrantUsers(conversationId, [userId], [], []);
    await insertPreventedUser(conversationId, []);
    await insertNotification(conversationId, "off", null);
    await insertHidden(conversationId, "off", null);
    await insertPin(conversationId, "off", "unpin");
    await insertNote(conversationId, "off", false, null);
    await insertVote(conversationId, "off", false, null, null, false, false, false, false, null);
    res.json(user);
});
router.delete('/', async function (req, res, next) {
    const { inviteId, token } = req.body;
    let user = await verifyToken(token);
    if(user.role != 1) {
        res.end("This user is not allow to use this function.");
        return;
    }
    let groupChats = await getGroupChatId(inviteId);
    if(groupChats[0].conversationId === undefined){
        res.end("Cannot found inviteId!");
        return;
    }
    await deleteGroupId(groupChats[0].inviteId);
    await deleteConversationId(groupChats[0].conversationId);

    let notifications = await getAllNotification();
    let notificationId = notifications.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deleteNotificationId(notificationId.id);

    let hiddens = await getAllHidden();
    let hiddenId = hiddens.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deleteHiddenId(hiddenId.id);

    let pins = await getAllPin();
    let pinId = pins.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deletePinId(pinId.id);

    let notes = await getAllNote();
    let noteId = notes.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deleteNoteId(noteId.noteId);

    let votes = await getAllVote();
    let voteId = votes.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deleteVoteId(voteId.id);

    let grantRoles = await getAllGrantUser();
    let grantRoleId = grantRoles.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deleteGrantUserId(grantRoleId.id);

    let preventedUsers = await getAllPreventedUser();
    let preventedUser = preventedUsers.find((item) => {
        return item.conversationId = groupChats[0].conversationId;
    });
    await deletePreventedUserId(preventedUser.id);

    res.end("Group deleted!");
});
module.exports = router;