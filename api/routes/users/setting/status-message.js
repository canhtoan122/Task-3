var express = require('express');
var router = express.Router();
let statusMessageSetting = require('./Model/status-messageSetting');
let mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'iris',
});

const util = require('util');
const query = util.promisify(connection.query).bind(connection);


router.put('/', async function (req, res, next) {
  let { type } = req.body;
  let statusMessage;
  if(type == "on"){
    statusMessage = new statusMessageSetting(true, 1);
  }else if(type == "off"){
    statusMessage = new statusMessageSetting(false, 0);
  }
  res.json(statusMessage);
});

module.exports = router;