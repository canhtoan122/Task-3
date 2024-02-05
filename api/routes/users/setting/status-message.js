var express = require('express');
var router = express.Router();
let statusMessageSetting = require('../../../Models/statusMessage');
let { verifyToken } = require('../../users/login/verifyToken');
let { createToken } = require('../../users/signIn/createToken');
let jwt = require('jsonwebtoken');
let { getAllUser } = require('../../../Database CRUD/user/read');
let { updateUser } = require('../../../Database CRUD/user/update');

router.put('/', async function (req, res, next) {
  let { type, token } = req.body;
  let user = await verifyToken(token);
  if(user.role != 1 && user.role != 2 && user.role != 3) {
    res.end("User role is not allow for this function.");
    return;
  }
  let statusMessage;
  if(type == "on"){
    statusMessage = new statusMessageSetting(true, 1);
  }else if(type == "off"){
    statusMessage = new statusMessageSetting(false, 0);
  }
  user.statusMessage = statusMessage;
  let users = await getAllUser();
  let resultUser = users.find((item) => {
    return item.token == token;
  });
  if(resultUser === undefined) {
    res.end("User not found.");
    return;
  }
  let newToken = await createToken(user);
  let decodedToken = jwt.decode(newToken);
  let expired_at = decodedToken && decodedToken.iat;
  let result = await updateUser(resultUser.userId, newToken, expired_at);
  user.token = newToken;
  res.json(user);
});

module.exports = router;