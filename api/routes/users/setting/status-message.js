var express = require('express');
var router = express.Router();
let statusMessageSetting = require('./Model/status-messageSetting');
let mysql = require('mysql');
let { verifyToken } = require('../../login/verifyToken');
let { createToken } = require('../../signIn/createToken');
let jwt = require('jsonwebtoken');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);
let getUser = async () => {
  try {
      let users = await query('SELECT * FROM user');
      return users;
  } catch (err) {
      console.log(err);
  }
}
let updateUser = async (userId, token, expired_at) => {
  try {
    let users = await query(`UPDATE user
    SET token = '${token}', expired_at = '${expired_at}'
    WHERE userId = ${userId}`);
    return users;
  } catch (err) {
      console.log(err);
  }
}

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
  let users = await getUser();
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