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
let updateUser = async (id, token, expired_at) => {
  try {
    let users = await query(`UPDATE user
    SET token = '${token}', expired_at = '${expired_at}'
    WHERE id = ${id}`);
    return users;
  } catch (err) {
      console.log(err);
  }
}

router.put('/', async function (req, res, next) {
  let { type, token } = req.body;
  let statusMessage;
  if(type == "on"){
    statusMessage = new statusMessageSetting(true, 1);
  }else if(type == "off"){
    statusMessage = new statusMessageSetting(false, 0);
  }
  let user = await verifyToken(token);
  user.statusMessage = statusMessage;
  let users = await getUser();
  let resultUser = users.find((item) => {
    return item.token == token;
  });
  let newToken = await createToken(user);
  let decodedToken = jwt.decode(newToken);
  let expired_at = decodedToken && decodedToken.iat;
  let result = await updateUser(resultUser.id, newToken, expired_at);
  res.json(result);
});

module.exports = router;