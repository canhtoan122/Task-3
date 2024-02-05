var express = require('express');
var router = express.Router();
let { verifyToken } = require('../../users/login/verifyToken');
let { updateNotification } = require('../../../Database CRUD/notification/update');
let { getAllNotification } = require('../../../Database CRUD/notification/read');
let { updateisNotification } = require('../../../Database CRUD/conversation/update');


router.put('/', async function (req, res, next) {
  let { conversationId, type, time, token } = req.body;
  let user = await verifyToken(token);
  if (user.role != 1 && user.role != 2 && user.role != 3) {
    res.end("User role is not allow for this function.");
    return;
  }
  if (type == "on") {
    let notifications = await getAllNotification();
    for (let i = 0; i < notifications.length; i++) {
      if(notifications[i].conversationId == conversationId){
        await updateNotification(notifications[i].id, conversationId, type, time);
        await updateisNotification(conversationId, true);
        break;
      }
    }
  }else{
    let notifications = await getAllNotification();
    for (let i = 0; i < notifications.length; i++) {
      if(notifications[i].conversationId == conversationId){
        await updateNotification(notifications[i].id, conversationId, type, time);
        await updateisNotification(conversationId, false);
        break;
      }
    }
  }
  let result = await getAllNotification();
  res.json(result);
});

module.exports = router;